const isDev = process.env.NODE_ENV === "development";
import { prisma } from "../../../database/connection";
import type { PrismaError } from "../../../types/types";

export async function logout(sessionId: string) {
  try {
    await prisma.user.update({
      where: {
        sessionId,
      },
      data: {
        sessionId: null,
      },
    });

    return true;
  } catch (e) {
    if (isDev) console.error(e);

    if (e.code === "P2025") {
      // User had no active session — treat as successful logout
      return true;
    }

    throw Error(e);
  }
}
