import { prisma } from "../../../database/connection";
import { Post, Topic } from "@prisma/client";

export async function getLastTopicPostQuery({
  topicId,
}: {
  topicId: number;
}): Promise<Post> {
  try {
    const res = await prisma.topic.findFirst({
      where: { id: topicId },
      select: {
        posts: {
          orderBy: {
            id: "desc",
          },
          take: 1,
        },
      },
    });

    return res?.posts[0];
  } catch (e) {
    throw new Error(e.message);
  }
}
