import { Request, Response } from "express";
import { deletePostQuery } from "../dbqueries/admin/deletePostQuery";
import { AppError } from "../../utils/AppError";
import { deleteMultiplePostQuery } from "../../controllers/dbqueries/admin/deleteMultiplePostQuery";

export async function deleteAllPosts(req: Request, res: Response) {
  const { userId } = req.body;

  await deleteMultiplePostQuery({
    where: { authorId: userId },
  });

  res.status(200).send({
    message: `Post from user id=${userId} deleted!`,
  });
}
