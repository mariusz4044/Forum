import { prisma } from "../../../database/connection";

type Category = {
  topicsCount: number;
};

type Section = {
  categories: Category[];
};

function getTotalTopics(sections: Section[]): number {
  return sections.reduce((sectionAcc, section) => {
    const sectionTotal = section.categories.reduce(
      (catAcc, cat) => catAcc + (cat.topicsCount || 0),
      0,
    );
    return sectionAcc + sectionTotal;
  }, 0);
}

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

    const lastUser = await prisma.user.findFirst({
      where: { id: { gt: 0 } },
      orderBy: { id: "desc" },
      select: {
        id: true,
        avatar: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    const posts = await prisma.post.findMany({
      where: { id: { gt: 0 } },
      select: { id: true },
    });

    return {
      sections,
      bestPosters,
      lastPosts,
      lastTopics,
      stats: {
        totalUsers: lastUser?.id || 0,
        lastUser,
        totalTopics: getTotalTopics(sections),
        totalPosts: posts?.length || 0,
      },
    };
  } catch (e: any) {
    throw new Error(e.message);
  }
}
