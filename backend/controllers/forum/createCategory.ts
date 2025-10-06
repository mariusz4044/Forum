import { Request, Response } from "express";
import { createCategoryQuery } from "../dbqueries/forum/createCategoryQuery";

interface SectionBody {
  title: string;
  roleRequire: string[];
  sectionId: number;
  description: string;
}

export async function createCategory(req: Request, res: Response) {
  const { title, description, sectionId }: SectionBody = req.body;

  const createdSection = await createCategoryQuery({
    title: title,
    createdById: req.user!.id,
    sectionId,
    description,
  });

  res.status(200).json({ message: "Section created!", data: createdSection });
}
