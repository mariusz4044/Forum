import { prisma } from "../../../database/connection";
import { Topic } from "@prisma/client";

export async function getCategoryTopicsQuery({
  categoryId,
  skip,
  take,
}: {
  categoryId: number;
  skip: number;
  take: number;
}) {
  try {
    return await prisma.category.findFirst({
      where: { id: categoryId },
      include: {
        _count: {
          select: {
            topics: true,
          },
        },
        topics: {
          skip,
          take,
          include: {
            createdBy: {
              select: {
                name: true,
                avatar: true,
                id: true,
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
