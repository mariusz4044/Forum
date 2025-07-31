import { prisma } from "../../../database/connection";

export async function getInitQuery() {
  try {
    return await prisma.section.findMany({
      include: {
        subSections: {
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
