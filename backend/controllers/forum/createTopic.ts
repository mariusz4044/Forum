import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { createTopicQuery } from "../dbqueries/forum/createTopicQuery";
import { createPostQuery } from "../dbqueries/forum/createPostQuery";
import { prisma } from "../../database/connection";
import { createPost } from "./createPost";
import { updateUniqueUser } from "../../controllers/dbqueries/user/updateUniqueUser";

interface TopicBody {
  title: string;
  sectionId: number;
  categoryId: number;
  message: string;
}

const topicDelay = parseInt(`${process.env.TOPIC_DELAY_PER_USER}`);

export async function createTopic(req: Request, res: Response) {
  const { title, categoryId, message }: TopicBody = req.body;

  if (!title) {
    throw new AppError(`Section title is required!`);
  }

  if (typeof categoryId !== "number") {
    throw new AppError(`categoryId id is invalid!`);
  }

  const nextUserTopicTime = new Date(req.user!.lastTopicTs);
  nextUserTopicTime.setSeconds(nextUserTopicTime.getSeconds() + topicDelay);

  if (nextUserTopicTime.getTime() > Date.now() && req.user?.role !== "ADMIN") {
    const remainingMs = nextUserTopicTime.getTime() - Date.now();
    const remainingMinutes = Math.ceil(remainingMs / 1000 / 60);

    throw new AppError(
      `Wait ${remainingMinutes} minutes before create next topic!`,
    );
  }

  const createdTopic = await createTopicQuery({
    title: title,
    createdById: req.user!.id,
    categoryId,
  });

  await updateUniqueUser({
    where: { id: req.user!.id },
    data: {
      lastTopicTs: new Date(),
    },
  });

  req.body = {
    message: message,
    topicId: createdTopic.id,
    blockResponse: true,
  };

  await createPost(req, res);

  res
    .status(200)
    .json({ message: "New topic is created!", data: createdTopic });
}
