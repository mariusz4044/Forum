import { User } from "@prisma/client";
import { prisma } from "../../../database/connection";
import { UserData } from "../../../types/types";

export async function getUserBySession(
  sessionId: string,
  readyForm: boolean = false,
): Promise<UserData | false | User> {
  let returnData: any = { user: true };

  if (readyForm) {
    returnData = {
      user: {
        select: {
          id: true,
          avatar: true,
          name: true,
          role: true,
          points: true,
          reputation: true,
        },
      },
    };
  }

  try {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: returnData,
    });

    if (!session) {
      return false;
    }

    return session.user as User;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
