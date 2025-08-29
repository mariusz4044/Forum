import { Topic } from "@prisma/client";
import { prisma } from "../../../database/connection";

const includesData = {
  createdBy: {
    select: {
      name: true,
      avatar: true,
      id: true,
      role: true,
    },
  },
}

async function getTopicByCursor({ direction, cursorId, categoryId, take }: {
  direction: "next" | "prev",
  cursorId: number,
  categoryId: number,
  take: number,
}) {
  const order = direction === "next" ? "desc" : "asc";

  const topicsOnPage = await prisma.topic.findMany({
    where: { categoryId: categoryId },
    orderBy: { id: order },
    cursor: { id: cursorId },
    skip: 1,
    take,
    include: includesData,
  });

  if (topicsOnPage.length === 0) {
    return [];
  }

  if (direction === "prev") return topicsOnPage.reverse();
  return topicsOnPage;
}

async function getTopicBySkip({ categoryId, skip, take }: {
  skip: number,
  take: number,
  categoryId: number,
}) {
  return await prisma.topic.findMany({
    where: { categoryId: categoryId },
    orderBy: { id: "desc" },
    skip,
    take,
    include: includesData
  })
}


async function getCategory(categoryId: number) {
  return await prisma.category.findUnique({
    where: { id: categoryId }
  });
}

export async function getCategoryTopicsQuery({
  categoryId,
  cursor,
  direction,
  page,
  take,
}: {
  categoryId: number;
  cursor?: number;
  page: number,
  direction?: 'next' | 'prev';
  take: number;
}) {
  try {
    const category = await getCategory(categoryId)
    let topics: Topic[] = [];

    if (!cursor) {
      const skipVal = (page - 1) * take;
      topics = await getTopicBySkip({ categoryId, take, skip: skipVal })
    }

    if (cursor && direction) {
      topics = await getTopicByCursor({ direction, cursorId: cursor, take, categoryId })
    }

    return { category, topics };
  } catch (e: any) {
    throw new Error(e.message);
  }
}