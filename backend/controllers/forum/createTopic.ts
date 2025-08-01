import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { createTopicQuery } from "../dbqueries/forum/createTopicQuery";

interface TopicBody {
  title: string;
  sectionId: number;
  categoryId: number;
  roleRequire: string[];
}

export async function createTopic(req: Request, res: Response) {
  const { title, categoryId, roleRequire }: TopicBody = req.body;

  if (!title) {
    throw new AppError(`Section title is required!`);
  }

  if (isNaN(Number(categoryId))) {
    throw new AppError(`categoryId id is invalid!`);
  }

  const createdSection = await createTopicQuery({
    title: title,
    createdById: req.user.id,
    categoryId,
    roleRequire,
  });

  res
    .status(200)
    .json({ message: "New topic is created!", data: createdSection });
}
