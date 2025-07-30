import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { Section } from "@prisma/client";

interface SectionQuery {
  title: string;
  createdById: number;
  roleRequire: string[];
}

export async function createSectionQuery({
  title,
  createdById,
  roleRequire,
}: SectionQuery): Promise<Section | Error> {
  try {
    return await prisma.section.create({
      data: {
        title,
        createdById,
        roleRequire,
      },
    });
  } catch (e) {
    throw new Error(e.message);
  }
}
