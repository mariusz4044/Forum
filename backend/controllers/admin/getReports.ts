import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { prisma } from "../../database/connection";

export async function getReports(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        reports: {
          some: {},
        },
      },
      include: {
        reports: {
          select: {
            createdById: true,
          },
        },
        author: {
          select: {
            name: true,
            avatar: true,
            id: true,
            role: true,
            reputation: true,
            totalPosts: true,
          },
        },
      },
    });

    return res.status(200).json(posts);
  } catch (e) {
    throw new AppError("Cannot find posts!");
  }
}
