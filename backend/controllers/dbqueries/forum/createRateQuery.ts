import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { RateBody } from "../../forum/createRate";

export async function createRateQuery({ postId, rate, authorId }: RateBody) {
  try {
    return await prisma.rate.create({
      data: {
        status: rate,
        authorId,
        postId,
      },
    });
  } catch (e: any) {
    if (e.code === "P2003") {
      throw new AppError("Post not found!");
    }

    throw new Error(e.message);
  }
}
