import { prisma } from "../../../database/connection";
import { Category } from "@prisma/client";

interface CreateCategoryQuery {
  title: string;
  createdById: number;
  sectionId: number;
  description: string;
}

export async function createCategoryQuery({
  title,
  createdById,
  sectionId,
  description,
}: CreateCategoryQuery): Promise<Category | Error> {
  try {
    return await prisma.category.create({
      data: {
        title,
        createdById,
        sectionId,
        description,
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
}
