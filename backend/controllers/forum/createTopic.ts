import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { createTopicQuery } from "../dbqueries/forum/createTopicQuery";
import { createPostQuery } from "../dbqueries/forum/createPostQuery";
import { prisma } from "../../database/connection";
import { createPost } from "./createPost";

interface TopicBody {
  title: string;
  sectionId: number;
  categoryId: number;
  message: string;
}

export async function createTopic(req: Request, res: Response) {
  const { title, categoryId, message }: TopicBody = req.body;

  if (!title) {
    throw new AppError(`Section title is required!`);
  }

  if (typeof categoryId !== "number") {
    throw new AppError(`categoryId id is invalid!`);
  }

  const createdTopic = await createTopicQuery({
    title: title,
    createdById: req.user.id,
    categoryId,
  });

  req.body = {
    message: message,
    topicId: createdTopic.id,
  };

  await createPost(req, res, false);

  res
    .status(200)
    .json({ message: "New topic is created!", data: createdTopic });
}
