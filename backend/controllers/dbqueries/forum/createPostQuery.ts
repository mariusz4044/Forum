import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { Post, Topic } from "@prisma/client";

interface PostQuery {
  message: string;
  authorId: number;
  topicId: number;
}

export async function createPostQuery({
  authorId,
  message,
  topicId,
}: PostQuery) {
  try {
    return await prisma.post.create({
      data: {
        authorId,
        message,
        topicId,
      },
      include: {
        topic: {
          select: {
            category: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
  } catch (e: any) {
    if (e.code === "P2003") {
      throw new AppError("Topic not found!");
    }

    throw new Error(e.message);
  }
}
