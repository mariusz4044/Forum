import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { deleteTopicQuery } from "../dbqueries/admin/deleteTopicQuery";

export async function deleteTopic(req: Request, res: Response) {
  const { topicId } = req.body;

  if (typeof topicId !== "number") {
    throw new AppError(`Provide correct type topicId!=${typeof topicId}`);
  }

  const deletedTopic = await deleteTopicQuery({
    topicId,
  });

  res.status(200).send({
    message: `Topic id=${topicId} deleted!`,
    deletedTopic,
  });
}
