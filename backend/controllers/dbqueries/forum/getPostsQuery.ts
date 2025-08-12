import { prisma } from "../../../database/connection";

export async function getPostsQuery({
  topicId,
  skip,
  take,
}: {
  topicId: number;
  skip: number;
  take: number;
}) {
  try {
    return await prisma.topic.findFirst({
      where: { id: topicId },
      include: {
        createdBy: {
          select: {
            name: true,
            avatar: true,
            role: true,
          },
        },
        _count: {
          select: {
            posts: true,
          },
        },
        posts: {
          skip,
          take,
          include: {
            author: {
              select: {
                _count: {
                  select: {
                    posts: true,
                  },
                },
                name: true,
                avatar: true,
                id: true,
                role: true,
                reputation: true,
              },
            },
          },
        },
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
}
