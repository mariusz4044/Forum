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
    const [
      sections,
      bestPosters,
      lastTopics,
      lastPosts,
      lastUser,
      totalPostsResult,
    ] = await Promise.all([
      // Sections
      prisma.section.findMany({
        include: {
          categories: {
            include: {
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
      }),

      // Best posters
      prisma.user.findMany({
        take: 5,
        orderBy: {
          totalPosts: "desc",
        },
        select: {
          id: true,
          name: true,
          avatar: true,
          points: true,
          reputation: true,
          role: true,
          totalPosts: true,
        },
      }),

      // Last topics
      prisma.topic.findMany({
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
      }),

      // Last posts
      prisma.post.findMany({
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
      }),

      // Last user
      prisma.user.findFirst({
        where: { id: { gt: 0 } },
        orderBy: { id: "desc" },
        select: {
          id: true,
          avatar: true,
          name: true,
          role: true,
          createdAt: true,
        },
      }),

      // Total posts count
      prisma.post.count({
        where: { id: { gt: 0 } },
      }),
    ]);

    return {
      sections,
      bestPosters,
      lastPosts,
      lastTopics,
      stats: {
        totalUsers: lastUser?.id || 0,
        lastUser,
        totalTopics: getTotalTopics(sections),
        totalPosts: totalPostsResult || 0,
      },
    };
  } catch (e: any) {
    throw new Error(e.message);
  }
}
