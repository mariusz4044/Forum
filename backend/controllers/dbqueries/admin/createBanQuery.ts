import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { Ban, Prisma } from "@prisma/client";

export async function createBanQuery(args: Prisma.BanCreateArgs) {
  try {
    return await prisma.ban.create(args);
  } catch (e: any) {
    if (e.code === "P2025") {
      throw new AppError("Post not found!");
    }

    throw new Error(e.message);
  }
}
