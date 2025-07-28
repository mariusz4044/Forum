const isDev = process.env.NODE_ENV === "development";
import { prisma } from "../../../database/connection";

export async function logout(
  sessionId: string,
  requiresActiveSession: boolean = true,
) {
  try {
    await prisma.session.delete({
      where: { id: sessionId },
    });

    return true;
  } catch (e) {
    if (e.code === "P2025") {
      // User had no active session — treat as successful logout
      if (requiresActiveSession === false) {
        return true;
      }

      throw new Error("Session is not available!");
    }

    if (isDev) console.error(e);

    throw Error(e);
  }
}
