import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { Topic } from "@prisma/client";

interface TopicQuery {
  title: string;
  createdById: number;
  categoryId: number;
}

export async function createTopicQuery({
  title,
  createdById,
  categoryId,
}: TopicQuery): Promise<Topic> {
  try {
    return await prisma.topic.create({
      data: {
        title,
        createdById,
        categoryId,
      },
    });
  } catch (e: any) {
    if (e.code === "P2003") throw new AppError("Category not exist!");
    throw new Error(e.message);
  }
}
