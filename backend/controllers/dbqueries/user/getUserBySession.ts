import { prisma } from "../../../database/connection";
import { UserData } from "../../../types/types";

export async function getUserBySession(
  sessionId: string,
  readyForm: boolean = false,
): Promise<UserData | false> {
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

    return session.user;
  } catch (error) {
    throw new Error(error.message);
  }
}
