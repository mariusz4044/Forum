import { Request, Response } from "express";
import { prisma } from "../../database/connection";
import { AppError } from "../../utils/AppError";

export default async function getUsersSettings(req: Request, res: Response) {
  const user = await prisma.user.findFirst({
    where: { id: req.user!.id },
    include: {
      _count: {
        select: {
          topicsCreated: true,
          rateGiven: true,
          reports: true,
          bansReceived: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError("User not found!");
  }

  res.status(200).send({
    id: user.id,
    login: user.login,
    reputation: user.reputation,
    name: user.name,
    role: user.role,
    totalPosts: user.totalPosts,
    bansReceived: user._count.bansReceived,
    reports: user._count.reports,
    rateGiven: user._count.rateGiven,
    topicsCreated: user._count.topicsCreated,
  });
}
