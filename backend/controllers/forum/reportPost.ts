import { Request, Response } from "express";
import { prisma } from "../../database/connection";
import { createReportQuery } from "../dbqueries/forum/createReportQuery";
import { AppError } from "../../utils/AppError";

export async function reportPost(req: Request, res: Response) {
  const { postId } = req.body;

  const isReported = await prisma.report.findFirst({
    where: { postId, createdById: req.user!.id },
  });

  if (isReported) {
    throw new AppError("You can't report this post again!");
  }

  await createReportQuery({
    postId,
    createdById: req.user!.id,
  });

  return res.status(200).json({
    message: "Post has been reported!",
  });
}
