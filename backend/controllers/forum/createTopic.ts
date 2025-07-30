import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { createTopicQuery } from "../dbqueries/forum/createTopicQuery";

interface TopicBody {
  title: string;
  sectionId: number;
  subSectionId: number;
  roleRequire: string[];
}

export async function createTopic(req: Request, res: Response) {
  const { title, subSectionId, roleRequire }: TopicBody = req.body;

  if (!title) {
    throw new AppError(`Section title is required!`);
  }

  if (isNaN(Number(subSectionId))) {
    throw new AppError(`sucSectionId id is invalid!`);
  }

  const createdSection = await createTopicQuery({
    title: title,
    createdById: req.user.id,
    subSectionId,
    roleRequire,
  });

  res
    .status(200)
    .json({ message: "New topic is created!", data: createdSection });
}
