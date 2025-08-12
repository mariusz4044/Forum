import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { Section } from "@prisma/client";

interface SectionQuery {
  title: string;
  createdById: number;
}

export async function createSectionQuery({
  title,
  createdById,
}: SectionQuery): Promise<Section | Error> {
  try {
    return await prisma.section.create({
      data: {
        title,
        createdById,
      },
    });
  } catch (e: any) {
    throw new Error(e.message);
  }
}
