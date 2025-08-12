import { User } from "@prisma/client";
import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";

export async function getUserDataBySession(sessionId: string): Promise<User> {
  try {
    const user = await prisma.user.findFirst({
      where: { sessions: { some: { id: sessionId } } },
    });

    if (!user) throw new AppError("User not found!", 404);

    return user;
  } catch (err: any) {
    throw new AppError("User not found!", 404);
  }
}
