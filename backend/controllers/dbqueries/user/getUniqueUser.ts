import { prisma } from "../../../database/connection";
import { Prisma, User } from "@prisma/client";

export async function getUniqueUser(
  args: Prisma.UserFindUniqueArgs,
): Promise<User | false> {
  try {
    const user = await prisma.user.findUnique(args);

    if (!user) {
      return false;
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}
