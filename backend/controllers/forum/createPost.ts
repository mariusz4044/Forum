import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { createSectionQuery } from "../dbqueries/forum/createSectionQuery";
import { createPostQuery } from "../dbqueries/forum/createPostQuery";
import { prisma } from "../../database/connection";
import { getLastTopicPostQuery } from "../dbqueries/forum/getLastTopicPostQuery";
import { getUniqueTopicQuery } from "../../controllers/dbqueries/forum/getUniqueTopicQuery";
import { Topic } from "@prisma/client";

interface PostBody {
  message: string;
  topicId: number;
  blockResponse?: boolean;
}

const isDev = process.env.NODE_ENV === "development";

const postDelay = parseInt(`${process.env.POST_DELAY_PER_USER}`);

export async function createPost(req: Request, res: Response) {
  const { message, topicId, blockResponse }: PostBody = req.body;

  const user = req.user!;

  // const nextUserPostTime = new Date(user.lastPostTs);
  // nextUserPostTime.setSeconds(nextUserPostTime.getSeconds() + postDelay);

  // if (nextUserPostTime.getTime() > Date.now() && !isDev) {
  //   throw new AppError(
  //     `Slow down! Create post is possible every ${postDelay} second!`,
  //   );
  // }

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
    message,
    topicId,
  });

  //global error handling - i don't need handle single error
  await prisma.user.update({
    where: { id: user.id },
    data: {
      lastPostTs: new Date(),
    },
  });

  await prisma.category.update({
    where: { id: createdPost!.topic!.category!.id },
    data: {
      lastPostId: createdPost.id,
    },
  });

  await prisma.topic.update({
    where: { id: topicId },
    data: {
      postsCount: { increment: 1 }
    }
  })


  if (blockResponse) return true;

  res.status(201).json({
    message: "Successfully created post!",
    data: createdPost,
  });
}
