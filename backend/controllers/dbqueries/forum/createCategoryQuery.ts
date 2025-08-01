import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { Category } from "@prisma/client";

interface CreateCategoryQuery {
  title: string;
  createdById: number;
  sectionId: number;
  description: string;
  roleRequire: string[];
}

export async function createCategoryQuery({
  title,
  createdById,
  sectionId,
  description,
  roleRequire,
}: CreateCategoryQuery): Promise<Category | Error> {
  try {
    return await prisma.category.create({
      data: {
        title,
        createdById,
        sectionId,
        description,
        roleRequire,
      },
    });
  } catch (e) {
    throw new Error(e.message);
  }
}
