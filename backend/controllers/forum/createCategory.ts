import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { createSectionQuery } from "../dbqueries/forum/createSectionQuery";
import { createCategoryQuery } from "../dbqueries/forum/createCategoryQuery";

interface SectionBody {
  title: string;
  roleRequire: string[];
  sectionId: number;
  description: string;
}

export async function createCategory(req: Request, res: Response) {
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

  const createdSection = await createCategoryQuery({
    title: title,
    createdById: req.user!.id,
    sectionId,
    description,
  });

  res.status(200).json({ message: "Section created!", data: createdSection });
}
