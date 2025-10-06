import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";

export async function deletePostQuery({ postId }: { postId: number }) {
  try {
    return await prisma.post.delete({
      where: { id: postId },
    });
  } catch (e: any) {
    if (e.code === "P2025") {
      throw new AppError("Post not found!");
    }

    throw new Error(e.message);
  }
}
