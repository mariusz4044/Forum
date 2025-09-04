import { Request, Response } from "express";
import { prisma } from "../../database/connection";
import { createReportQuery } from "../dbqueries/forum/createReportQuery";
import { AppError } from "../../utils/AppError";
import { updateUniqueUser } from "../dbqueries/user/updateUniqueUser";

const reportDelay = parseInt(process.env.REPORT_DELAY_PER_USER!);

export async function reportPost(req: Request, res: Response) {
  const { postId } = req.body;
  const user = req.user!;

  const nextReportTime = new Date(user.lastReportTs);
  nextReportTime.setSeconds(nextReportTime.getSeconds() + 60);

  if (nextReportTime.getTime() > Date.now() && user.role !== "ADMIN") {
    throw new AppError(
      `Slow down! wait ${reportDelay} before next report!`,
      null,
      429,
    );
  }

  const isReported = await prisma.report.findFirst({
    where: { postId, createdById: user.id },
  });

  if (isReported) {
    throw new AppError("You can't report this post again!");
  }

  await createReportQuery({
    postId,
    createdById: user.id,
  });

  await updateUniqueUser({
    where: { id: user.id },
    data: {
      lastReportTs: new Date(),
    },
  });

  return res.status(200).json({
    message: "Post has been reported!",
  });
}
