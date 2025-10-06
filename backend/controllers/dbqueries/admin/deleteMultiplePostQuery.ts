import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";

export async function deleteMultiplePostQuery(userId: number) {
  try {
    const topics = await prisma.post.groupBy({
      by: ["topicId"],
      where: { authorId: userId },
      _count: { id: true },
    });

    const topicData = topics.map(t => ({
      topicId: t.topicId,
      count: t._count.id,
    }));

    await prisma.post.deleteMany({ where: { authorId: userId } });
    return { topicData }
  } catch (e: any) {
    if (e.code === "P2025") {
      throw new AppError("Post not found!");
    }

    throw new Error(e.message);
  }
}
