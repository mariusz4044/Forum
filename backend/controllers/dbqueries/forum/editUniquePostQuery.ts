const isDev = process.env.NODE_ENV !== "production";
import { prisma } from "../../../database/connection";
import { Prisma, Post } from "@prisma/client";

export async function editUniquePostQuery(
  args: Prisma.PostUpdateArgs,
): Promise<Post> {
  try {
    return await prisma.post.update(args);
  } catch (e: any) {
    if (isDev) console.error(e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        throw new Error(e.message);
      }
    }

    throw new Error(e.message);
  }
}
