const isDev = process.env.NODE_ENV !== "production";
import { prisma } from "../../../database/connection";
import { Prisma, Topic } from "@prisma/client";

export async function getUniqueTopicQuery(
  args: Prisma.TopicFindUniqueArgs,
): Promise<Topic | null> {
  try {
    return await prisma.topic.findUnique(args);
  } catch (e: any) {
    if (isDev) console.error(e);

    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        throw new Error(e.message);
      }
    }

    throw new Error(e.message);
  }
}
