import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { createSectionQuery } from "../dbqueries/forum/createSectionQuery";
import { createPostQuery } from "../dbqueries/forum/createPostQuery";
import { prisma } from "../../database/connection";

interface PostBody {
  message: string;
  topicId: number;
}

const postDelay = parseInt(process.env.POST_DELAY_PER_USER);

export async function createPost(req: Request, res: Response) {
  const { message, topicId }: PostBody = req.body;
  const user = req.user;

  if (isNaN(Number(topicId))) {
    throw new AppError(`Not found topic id: ${topicId}!`);
  }

  if (!message) {
    throw new AppError(`Message is required!`);
  }

  const nextUserPostTime = new Date(user.lastPostTs);
  nextUserPostTime.setSeconds(nextUserPostTime.getSeconds() + postDelay);

  if (nextUserPostTime.getTime() > Date.now()) {
    throw new AppError(
      `Slow down! Create post is possible every ${postDelay} second!`,
    );
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
  } catch (e) {
    throw new Error(e);
  }

  res.status(201).json({
    message: "Successfully created post!",
    data: createdPost,
  });
}
