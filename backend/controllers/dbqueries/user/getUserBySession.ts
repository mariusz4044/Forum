import { prisma } from "../../../database/connection";
import { Prisma, User } from "@prisma/client";
import specifyUserData from "../../../utils/specifyUserData";
import { UserData } from "../../../types/types";

export async function getUserBySession(
  sessionId: string,
): Promise<UserData | false> {
  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        user: true,
      },
    });

    if (!session) {
      return false;
    }

    return specifyUserData(session.user);
  } catch (error) {
    throw new Error(error.message);
  }
}
