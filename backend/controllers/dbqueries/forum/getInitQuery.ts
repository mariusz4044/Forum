import { prisma } from "../../../database/connection";

export async function getInitQuery() {
  try {
    const sections = await prisma.section.findMany({
      include: {
        categories: {
          include: {
            _count: {
              select: {
                topics: true,
              },
            },
            lastPost: {
              select: {
                topic: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
                message: true,
                createdAt: true,
                author: {
                  select: {
                    avatar: true,
                    id: true,
                    role: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const bestPosters = await prisma.user.findMany({
      take: 5,
      orderBy: {
        posts: {
          _count: "desc",
        },
      },
      select: {
        id: true,
        name: true,
        avatar: true,
        points: true,
        reputation: true,
        role: true,
        _count: {
          select: { posts: true },
        },
      },
    });

    const lastTopics = await prisma.topic.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        isOpen: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
          },
        },
        category: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    const lastPosts = await prisma.post.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        message: true,
        editedMessage: true,
        createdAt: true,
        ratingSummary: true,
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            role: true,
          },
        },
        topic: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return {
      sections,
      bestPosters,
      lastPosts,
      lastTopics,
    };
  } catch (e: any) {
    throw new Error(e.message);
  }
}
