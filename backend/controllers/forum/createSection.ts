import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { createSectionQuery } from "../dbqueries/forum/createSectionQuery";

interface SectionBody {
  title: string;
}

export async function createSection(req: Request, res: Response) {
  const { title }: SectionBody = req.body;

  if (!title) {
    throw new AppError(`Section title is required!`);
  }

  const createdSection = await createSectionQuery({
    title: title,
    createdById: req.user!.id,
  });

  res.status(200).json({ message: "Section created!", data: createdSection });
}
