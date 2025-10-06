import { prisma } from "../../../database/connection";
import type { Post } from "@prisma/client";

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
            id: "desc" as const,
          },
          take: 1,
        },
      },
    });

    if (!res) {
      throw new Error("Topic not found");
    }

    const posts = res.posts ?? [];

    //@ts-ignore //ts not working with at
    const post = posts.at(0)!;
    return post;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    throw new Error("Unexpected error retrieving topic post");
  }
}
