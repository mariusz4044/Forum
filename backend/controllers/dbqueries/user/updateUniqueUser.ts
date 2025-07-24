const isDev = process.env.NODE_ENV !== "production";
import { prisma } from "../../../database/connection";
import { Prisma, User } from "@prisma/client";

export async function updateUniqueUser(
  args: Prisma.UserUpdateArgs,
): Promise<User> {
  try {
    return await prisma.user.update(args);
  } catch (e) {
    if (isDev) console.error(e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        throw new Error(e.message);
      }
    }

    throw new Error(e.message);
  }
}
