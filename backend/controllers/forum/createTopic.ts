import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { createTopicQuery } from "../dbqueries/forum/createTopicQuery";
import { prisma } from "../../database/connection";
import { createPost } from "./createPost";
import { updateUniqueUser } from "../dbqueries/user/updateUniqueUser";

interface TopicBody {
  title: string;
  sectionId: number;
  categoryId: number;
  message: string;
}

const topicDelay = parseInt(`${process.env.TOPIC_DELAY_PER_USER}`);

export async function createTopic(req: Request, res: Response) {
  const { title, categoryId, message }: TopicBody = req.body;

  const nextUserTopicTime = new Date(req.user!.lastTopicTs);
  nextUserTopicTime.setSeconds(nextUserTopicTime.getSeconds() + topicDelay);

  if (nextUserTopicTime.getTime() > Date.now() && req.user?.role !== "ADMIN") {
    const remainingMs = nextUserTopicTime.getTime() - Date.now();
    const remainingMinutes = Math.ceil(remainingMs / 1000 / 60);

    throw new AppError(
      `Wait ${remainingMinutes} minutes before create next topic!`,
    );
  }

  const createdTopic = await createTopicQuery({
    title: title,
    createdById: req.user!.id,
    categoryId,
  });

  await updateUniqueUser({
    where: { id: req.user!.id },
    data: {
      lastTopicTs: new Date(),
    },
  });

  req.body = {
    message: message,
    topicId: createdTopic.id,
    blockResponse: true,
  };

  await createPost(req, res);

  await prisma.category.update({
    where: { id: categoryId },
    data: {
      topicsCount: { increment: 1 }
    }
  })

  res
    .status(200)
    .json({ message: "New topic is created!", data: createdTopic });
}
