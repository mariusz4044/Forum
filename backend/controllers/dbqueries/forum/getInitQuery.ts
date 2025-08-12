import { prisma } from "../../../database/connection";

export async function getInitQuery() {
  try {
    return await prisma.section.findMany({
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
  } catch (e: any) {
    throw new Error(e.message);
  }
}
