import { prisma } from "../../../database/connection";
import { Topic } from "@prisma/client";

export async function getCategoryTopicsQuery({
  categoryId,
}: {
  categoryId: number;
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
