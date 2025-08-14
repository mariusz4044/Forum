import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { editUniquePostQuery } from "../../controllers/dbqueries/forum/editUniquePostQuery";

export async function editPost(req: Request, res: Response) {
  const { postId, message } = req.body;

  if (typeof postId !== "number") {
    throw new AppError(`Provide correct type postId!=${typeof postId}`);
  }

  await editUniquePostQuery({
    where: { id: +postId },
    data: {
      message,
    },
  });

  res.status(200).send({
    message: `Post id=${postId} edited!`,
  });
}
