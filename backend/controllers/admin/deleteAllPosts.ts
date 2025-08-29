import { Request, Response } from "express";
import { deletePostQuery } from "../dbqueries/admin/deletePostQuery";
import { AppError } from "../../utils/AppError";
import { deleteMultiplePostQuery } from "../../controllers/dbqueries/admin/deleteMultiplePostQuery";
import { prisma } from "../../database/connection";

export async function deleteAllPosts(req: Request, res: Response) {
  const { userId } = req.body;

  const { topicData } = await deleteMultiplePostQuery(userId);

  for (const { topicId, count } of topicData) {
    await prisma.topic.update({
      where: { id: topicId },
      data: {
        postsCount: { decrement: count }
      }
    });
  }

  res.status(200).send({
    message: `Post from user id=${userId} deleted!`,
  });
}
