import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";

export async function deleteTopicQuery({ topicId }: { topicId: number }) {
  try {
    return await prisma.topic.delete({
      where: { id: topicId },
    });
  } catch (e: any) {
    if (e.code === "P2025") {
      throw new AppError("Post not found!");
    }

    throw new Error(e.message);
  }
}
