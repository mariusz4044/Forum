import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { SubSection } from "@prisma/client";

interface SubSectionQuery {
  title: string;
  createdById: number;
  sectionId: number;
  description: string;
  roleRequire: string[];
}

export async function createSubSectionQuery({
  title,
  createdById,
  sectionId,
  description,
  roleRequire,
}: SubSectionQuery): Promise<SubSection | Error> {
  try {
    return await prisma.subSection.create({
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
