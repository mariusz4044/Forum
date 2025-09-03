import { Topic, Post } from "@prisma/client";
import { prisma } from "../../../database/connection";

async function getPostsByCursor({
  direction,
  cursorId,
  topicId,
  take,
}: {
  direction: "next" | "prev";
  cursorId: number;
  topicId: number;
  take: number;
}) {
  const order = direction === "next" ? "asc" : "desc";

  const postsOnPage = await prisma.post.findMany({
    where: { topicId: topicId },
    orderBy: { id: order },
    cursor: { id: cursorId },
    skip: 1,
    take,
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
          id: true,
          role: true,
          reputation: true,
          totalPosts: true,
        },
      },
    },
  });

  if (postsOnPage.length === 0) {
    return [];
  }

  if (direction === "prev") return postsOnPage.reverse();
  return postsOnPage;
}

async function getTopic(topicId: number) {
  return prisma.topic.findUnique({
    where: { id: topicId },
    include: {
      createdBy: {
        select: {
          name: true,
          avatar: true,
          role: true,
          id: true,
        },
      },
    },
  });
}

async function getPostsByPageJump({
  topicId,
  skip,
  take,
}: {
  skip: number;
  take: number;
  topicId: number;
}) {
  const postsOnPageIds = await prisma.post.findMany({
    where: { topicId: topicId },
    orderBy: { id: "asc" },
    skip,
    take,
    select: {
      id: true,
    },
  });

  if (postsOnPageIds.length === 0) {
    return [];
  }

  const ids = postsOnPageIds.map((post) => post.id);

  return prisma.post.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    orderBy: {
      id: "asc",
    },
    include: {
      author: {
        select: {
          name: true,
          avatar: true,
          id: true,
          role: true,
          reputation: true,
          totalPosts: true,
        },
      },
    },
  });
}

export async function getPostsQuery({
  topicId,
  cursor,
  direction,
  page,
  take,
}: {
  topicId: number;
  cursor?: number;
  page: number;
  direction?: "next" | "prev";
  take: number;
}) {
  try {
    const topic = await getTopic(topicId);
    let posts: Post[] = [];

    if (cursor && direction) {
      posts = await getPostsByCursor({
        direction,
        cursorId: cursor,
        take,
        topicId,
      });
    } else {
      const skipVal = (page - 1) * take;
      posts = await getPostsByPageJump({ topicId, take, skip: skipVal });
    }

    return { topic, posts };
  } catch (e: any) {
    throw new Error(e.message);
  }
}
