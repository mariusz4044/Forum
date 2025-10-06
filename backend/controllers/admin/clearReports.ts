import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { prisma } from "../../database/connection";

export async function clearReports(req: Request, res: Response) {
  const { postId } = req.body;

  try {
    await prisma.post.update({
      where: { id: postId },
      data: {
        reports: {
          deleteMany: {},
        },
      },
    });

    return res
      .status(200)
      .json({ message: `Removed all reports from postId=${postId}!` });
  } catch (e) {
    throw new AppError("Cannot find posts!");
  }
}
