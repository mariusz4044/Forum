import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { editUniquePostQuery } from "../../controllers/dbqueries/forum/editUniquePostQuery";
import { getFormattedDate } from "../../utils/getFormattedDate";

export async function editPost(req: Request, res: Response) {
  const { postId, message, reason } = req.body;

  if (typeof postId !== "number") {
    throw new AppError(`Provide correct type postId!=${typeof postId}`);
  }

  await editUniquePostQuery({
    where: { id: +postId },
    data: {
      message: `${message}`,
      editedMessage: `//admin edit ${getFormattedDate()} ${reason ? `| reason: ${reason}` : ""}`,
    },
  });

  res.status(200).send({
    message: `Post id=${postId} edited!`,
  });
}
