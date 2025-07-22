import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
const isDev = process.env.NODE_ENV === "development";
import { prisma } from "../../../database/connection";

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
  } catch (err) {
    if (isDev) console.error(err);

    if (err.code === "P2025") {
      // User had no active session — treat as successful logout
      return true;
    }

    return {
      error: "Cannot destroy session!",
      code: err.code,
    };
  }
}
