import { Request, Response } from "express";
import { deleteMultiplePostQuery } from "../dbqueries/admin/deleteMultiplePostQuery";
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
