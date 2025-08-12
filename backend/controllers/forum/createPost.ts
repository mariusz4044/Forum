import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { createSectionQuery } from "../dbqueries/forum/createSectionQuery";
import { createPostQuery } from "../dbqueries/forum/createPostQuery";
import { prisma } from "../../database/connection";
import { getLastTopicPostQuery } from "../dbqueries/forum/getLastTopicPostQuery";

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

  if (isNaN(Number(topicId))) {
    throw new AppError(`Not found topic id: ${topicId}!`);
  }

  if (!message) {
    throw new AppError(`Message is required!`);
  }

  const nextUserPostTime = new Date(user.lastPostTs);
  nextUserPostTime.setSeconds(nextUserPostTime.getSeconds() + postDelay);

  if (nextUserPostTime.getTime() > Date.now() && !isDev) {
    throw new AppError(
      `Slow down! Create post is possible every ${postDelay} second!`,
    );
  }

  const lastPostInTopic = await getLastTopicPostQuery({
    topicId,
  });

  if (lastPostInTopic?.authorId === user.id && !isDev) {
    throw new AppError("You can't write two posts under a row!");
  }

  const createdPost = await createPostQuery({
    authorId: user.id,
    message,
    topicId,
  });

  try {
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
  } catch (e: any) {
    throw new Error(e);
  }

  if (blockResponse) return true;

  res.status(201).json({
    message: "Successfully created post!",
    data: createdPost,
  });
}
