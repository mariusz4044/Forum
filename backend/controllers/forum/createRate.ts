import { AppError } from "../../utils/AppError";
import { Request, Response } from "express";
import { createRateQuery } from "../dbqueries/forum/createRateQuery";
import { prisma } from "../../database/connection";

export interface RateBody {
  rate: 1 | -1;
  postId: number;
  authorId?: number;
}

export async function createRate(req: Request, res: Response) {
  const { rate, postId }: RateBody = req.body;

  if (typeof rate !== "number") {
    throw new AppError(`Rate is invalid type ${typeof rate}!`);
  }

  if (typeof postId !== "number") {
    throw new AppError(`postId is invalid type ${typeof rate}!`);
  }

  if (rate !== 1 && rate !== -1) {
    throw new AppError(`Rate is invalid!`);
  }

  const isRated = await prisma.rate.findFirst({
    where: { postId, authorId: req.user.id },
  });

  if (req.user.role !== "ADMIN" && isRated) {
    throw new AppError(`You already rated this post!`);
  }

  await createRateQuery({
    rate,
    postId,
    authorId: req.user.id,
  });

  const postUpdated = await prisma.post.update({
    where: { id: postId },
    data: {
      ratingSummary: rate === 1 ? { increment: 1 } : { decrement: 1 },
    },
  });

  return res.status(201).json({
    message: "Successfully added rate!",
    ratingSummary: postUpdated.ratingSummary,
  });
}
