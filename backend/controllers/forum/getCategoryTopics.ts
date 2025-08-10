import { Request, Response } from "express";
import { getCategoryTopicsQuery } from "../dbqueries/forum/getCategoryTopicsQuery";

const topicPerPage = parseInt(process.env.TOPIC_PER_PAGE);

export async function getCategoryTopics(req: Request, res: Response) {
  const { id } = req.params;
  const { page = 1 } = req.query;
  let maxPage = 1;

  if (!id) {
    throw new Error("Category not found");
  }

  const categoryData = await getCategoryTopicsQuery({
    categoryId: parseInt(id),
    skip: +page * topicPerPage - topicPerPage,
    take: topicPerPage,
  });

  if (categoryData._count?.topics) {
    maxPage = Math.ceil(categoryData._count?.topics / topicPerPage);
  }

  res.status(200).json({
    data: categoryData,
    navigation: {
      itemsPerPage: topicPerPage,
      currentPage: +page,
      maxPage,
    },
  });
}
