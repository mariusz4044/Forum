import { PrismaError } from "types/types";
import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { Prisma } from "@prisma/client";

export async function deleteMultiplePostQuery(args: Prisma.PostDeleteManyArgs) {
  try {
    return await prisma.post.deleteMany(args);
  } catch (e: any) {
    if (e.code === "P2025") {
      throw new AppError("Post not found!");
    }

    throw new Error(e.message);
  }
}
