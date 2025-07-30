import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { Topic } from "@prisma/client";

interface TopicQuery {
  title: string;
  createdById: number;
  subSectionId: number;
  roleRequire: string[];
}

export async function createTopicQuery({
  title,
  createdById,
  subSectionId,
  roleRequire,
}: TopicQuery): Promise<Topic | Error> {
  try {
    return await prisma.topic.create({
      data: {
        title,
        createdById,
        subSectionId,
        roleRequire,
      },
    });
  } catch (e) {
    throw new Error(e.message);
  }
}
