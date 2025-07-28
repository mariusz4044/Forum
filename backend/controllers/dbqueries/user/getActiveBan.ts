import { prisma } from "../../../database/connection";
import { Prisma, Ban } from "@prisma/client";

export async function getActiveBan(userId: number): Promise<Ban | false> {
  try {
    const ban = await prisma.ban.findFirst({
      where: {
        bannedUserId: userId,
        endTime: {
          gt: new Date(),
        },
      },
    });

    if (!ban) {
      return false;
    }

    return ban;
  } catch (error) {
    throw new Error(error.message);
  }
}
