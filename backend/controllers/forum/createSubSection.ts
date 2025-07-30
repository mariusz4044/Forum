import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { createSectionQuery } from "../dbqueries/forum/createSectionQuery";
import { createSubSectionQuery } from "../dbqueries/forum/createSubSectionQuery";

interface SectionBody {
  title: string;
  roleRequire: string[];
  sectionId: number;
  description: string;
}

export async function createSubSection(req: Request, res: Response) {
  const { title, description, roleRequire, sectionId }: SectionBody = req.body;

  if (!title) {
    throw new AppError(`Section title is required!`);
  }

  if (!description) {
    throw new AppError(`Section description is required!`);
  }

  if (isNaN(Number(sectionId))) {
    throw new AppError(`Section id is invalid!`);
  }

  const createdSection = await createSubSectionQuery({
    title: title,
    createdById: req.user.id,
    sectionId,
    description,
    roleRequire,
  });

  res.status(200).json({ message: "Section created!", data: createdSection });
}
