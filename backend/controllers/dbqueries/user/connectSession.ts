import { prisma } from "../../../database/connection";
import { Prisma, Session } from "@prisma/client";

export async function connectSession(
  userId: number,
  sessionId: string,
): Promise<Session | false> {
  try {
    const updatedSession = await prisma.session.update({
      where: {
        id: sessionId,
      },
      data: {
        userId: userId,
      },
    });

    if (!updatedSession) {
      return false;
    }

    return updatedSession;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
