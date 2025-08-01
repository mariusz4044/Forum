import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { Topic } from "@prisma/client";

interface TopicQuery {
  title: string;
  createdById: number;
  categoryId: number;
  roleRequire: string[];
}

export async function createTopicQuery({
  title,
  createdById,
  categoryId,
  roleRequire,
}: TopicQuery): Promise<Topic | Error> {
  try {
    return await prisma.topic.create({
      data: {
        title,
        createdById,
        categoryId,
        roleRequire,
      },
    });
  } catch (e) {
    if (e.code === "P2003") throw new AppError("Category not exist!");
    throw new Error(e.message);
  }
}
