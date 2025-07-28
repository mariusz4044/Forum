import { prisma } from "../../../database/connection";
import { Prisma, User } from "@prisma/client";
import { UserData } from "../../../types/types";

export async function getUserBySession(
  sessionId: string,
): Promise<UserData | false> {
  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: {
          select: {
            id: true,
            avatar: true,
            name: true,
            role: true,
            points: true,
          },
        },
      },
    });

    if (!session) {
      return false;
    }

    return session.user;
  } catch (error) {
    throw new Error(error.message);
  }
}
