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
          },
        },
      },
    });
  } catch (e) {
    throw new Error(e.message);
  }
}
