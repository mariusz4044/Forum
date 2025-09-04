import { prisma } from "../../../database/connection";
import { AppError } from "../../../utils/AppError";
import { RateBody } from "../../forum/createRate";

interface CreateReportQuery {
  postId: number;
  createdById: number;
}

export async function createReportQuery({
  postId,
  createdById,
}: CreateReportQuery) {
  try {
    return await prisma.report.create({
      data: { postId, createdById },
    });
  } catch (e: any) {
    if (e.code === "P2003") {
      throw new AppError("Post not found!");
    }

    throw new Error(e.message);
  }
}
