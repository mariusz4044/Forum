import { Request, Response } from "express";
import { getCategoryTopicsQuery } from "../dbqueries/forum/getCategoryTopicsQuery";
import { AppError } from "../../utils/AppError";
import { Topic } from "@prisma/client";

const topicPerPage = parseInt(`${process.env.TOPIC_PER_PAGE}`);

export async function getCategoryTopics(req: Request, res: Response) {
  const { page = 1, cursor = 0, direction = "next" } = req.query;
  const { id } = req.params;

  if (!id) {
    throw new Error("Category not found");
  }

  if (direction !== "next" && direction !== "prev") {
    throw new AppError("Invalid direction!");
  }

  if (Number.isNaN(cursor)) {
    throw new AppError("Invalid cursor!");
  }

  const { category, topics } = await getCategoryTopicsQuery({
    categoryId: parseInt(id),
    cursor: Number(cursor),
    direction: direction,
    page: Number(page),
    take: topicPerPage,
  });

  let maxPage = 1;
  if (category?.topicsCount) {
    maxPage = Math.ceil(category.topicsCount / topicPerPage);
  }

  res.status(200).json({
    data: { category, topics },
    navigation: {
      itemsPerPage: topicPerPage,
      currentPage: +page,
      maxPage,
      cursors: {
        next: topics[topics.length - 1]?.id || null,
        prev: topics[0]?.id || null,
      },
    },
  });
}
