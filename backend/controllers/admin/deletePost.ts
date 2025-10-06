import { Request, Response } from "express";
import { deletePostQuery } from "../dbqueries/admin/deletePostQuery";
import { prisma } from "../../database/connection";

export async function deletePost(req: Request, res: Response) {
  const { postId } = req.body;

  const post = await deletePostQuery({
    postId: postId,
  });

  await prisma.topic.update({
    where: { id: post.topicId },
    data: {
      postsCount: { decrement: 1 }
    }
  })

  res.status(200).send({
    message: `Post id=${postId} deleted!`,
  });
}
