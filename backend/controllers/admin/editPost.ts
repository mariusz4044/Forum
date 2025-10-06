import { Request, Response } from "express";
import { editUniquePostQuery } from "../dbqueries/forum/editUniquePostQuery";
import { getFormattedDate } from "../../utils/getFormattedDate";

export async function editPost(req: Request, res: Response) {
  const { postId, message, reason } = req.body;

  await editUniquePostQuery({
    where: { id: +postId },
    data: {
      message: `${message}`,
      editedMessage: `//Admin Edit ${getFormattedDate()} ${reason ? `| Reason: ${reason}` : ""}`,
    },
  });

  res.status(200).send({
    message: `Post id=${postId} edited!`,
  });
}
