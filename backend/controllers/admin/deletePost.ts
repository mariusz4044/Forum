import { Request, Response } from "express";
import { deletePostQuery } from "../dbqueries/admin/deletePostQuery";
import { AppError } from "../../utils/AppError";

export async function deletePost(req: Request, res: Response) {
  const { postId } = req.body;

  if (typeof postId !== "number") {
    throw new AppError(`Provide correct type postId!=${typeof postId}`);
  }

  await deletePostQuery({
    postId: postId,
  });

  res.status(200).send({
    message: `Post id=${postId} deleted!`,
  });
}
