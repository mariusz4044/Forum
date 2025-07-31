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
}: PostQuery): Promise<Post | Error> {
  try {
    return await prisma.post.create({
      data: {
        authorId,
        message,
        topicId,
      },
    });
  } catch (e) {
    if (e.code === "P2003") {
      throw new AppError("Topic not found!");
    }

    throw new Error(e.message);
  }
}
