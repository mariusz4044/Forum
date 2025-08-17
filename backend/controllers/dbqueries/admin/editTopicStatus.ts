import { Request, Response } from "express";
import { AppError } from "../../../utils/AppError";
import { editUniqueTopicQuery } from "../forum/editUniqueTopicQuery";

export async function editTopicStatus(req: Request, res: Response) {
  const { topicId, status } = req.body;

  if (!topicId) {
    throw new AppError("TopicId not found!");
  }

  if (status === undefined) {
    throw new AppError("status not found!");
  }

  const topic = await editUniqueTopicQuery({
    where: { id: topicId },
    data: {
      isOpen: status,
    },
  });

  return res
    .status(200)
    .json({ message: `Topic is ${!topic?.isOpen ? "closed!" : "open"} now!` });
}
