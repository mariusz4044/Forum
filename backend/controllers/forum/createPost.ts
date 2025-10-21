import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { createPostQuery } from "../dbqueries/forum/createPostQuery";
import { prisma } from "../../database/connection";
import { getLastTopicPostQuery } from "../dbqueries/forum/getLastTopicPostQuery";
import { getUniqueTopicQuery } from "../dbqueries/forum/getUniqueTopicQuery";
import { Topic } from "@prisma/client";

import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";

interface PostBody {
  message: string;
  topicId: number;
  blockResponse?: boolean;
}

const postsPerPage = parseInt(`${process.env.POSTS_PER_PAGE}`);

const window = new JSDOM("").window;
//@ts-ignore
const purify = DOMPurify(window as unknown as Window);

const sanitizeConfig = {
  ALLOWED_TAGS: [
    "p",
    "b",
    "strong",
    "u",
    "h1",
    "h2",
    "h3",
    "br",
    "text-left",
    "text-center",
    "text-right",
  ],
  ALLOWED_ATTR: ["style"],
  ALLOW_DATA_ATTR: false,
  transformTags: {
    "*": (tagName: string, attribs: Record<string, string>) => {
      //Allow only text align style tag
      if (attribs.style) {
        const match = attribs.style.match(
          /text-align\s*:\s*(left|center|right|justify);?/i,
        );
        if (!match) return { tagName, attribs: {} };
        if (match)
          return {
            tagName,
            attribs: { style: `text-align: ${match[1]}` },
          };
      }
      return { tagName, attribs };
    },
  },
};

export async function createPost(req: Request, res: Response) {
  const { message, topicId, blockResponse }: PostBody = req.body;
  const user = req.user!;

  const sanitizedMessage = purify.sanitize(message, sanitizeConfig);
  const messageLength = sanitizedMessage.replace(/<[^>]*>/g, "").length;

  if (messageLength < 4) {
    throw new AppError("Minimum message length is 5!");
  }

  const lastPostInTopic = await getLastTopicPostQuery({
    topicId,
  });

  if (lastPostInTopic?.authorId === user.id && user.role !== "ADMIN") {
    throw new AppError("You can't write posts under a row!");
  }

  const topic: Topic | null = await getUniqueTopicQuery({
    where: { id: topicId },
  });

  if (!topic) {
    throw new AppError("Topic not found!");
  }

  if (!topic.isOpen) {
    throw new AppError("Topic is closed!");
  }

  const createdPost = await createPostQuery({
    authorId: user.id,
    message: sanitizedMessage,
    topicId,
  });

  //global error handling - i don't need handle single error
  await prisma.user.update({
    where: { id: user.id },
    data: {
      lastPostTs: new Date(),
      totalPosts: { increment: 1 },
    },
  });

  await prisma.category.update({
    where: { id: createdPost!.topic!.category!.id },
    data: {
      lastPostId: createdPost.id,
    },
  });

  const topicUpdated = await prisma.topic.update({
    where: { id: topicId },
    data: {
      postsCount: { increment: 1 },
    },
  });

  if (blockResponse) return true;

  let maxPage = 1;
  if (topicUpdated?.postsCount) {
    maxPage = Math.ceil(topicUpdated.postsCount / postsPerPage);
  }

  res.status(201).json({
    message: "Successfully created post!",
    data: { ...createdPost, navigation: { maxPage } },
  });
}
