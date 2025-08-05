import { Request, Response } from "express";
import { getPostsQuery } from "../dbqueries/forum/getPostsQuery";

const topicPerPage = parseInt(process.env.POSTS_PER_PAGE);

export async function getPosts(req: Request, res: Response) {
  const { id } = req.params;
  const { page = 1 } = req.query;
  let maxPage = 1;

  if (!id) {
    throw new Error("Topic not found");
  }

  const postsData = await getPostsQuery({
    topicId: parseInt(id),
    skip: +page * topicPerPage - topicPerPage,
    take: topicPerPage,
  });

  if (postsData?._count?.posts) {
    maxPage = Math.round(postsData._count?.posts / topicPerPage);
  }

  res.status(200).json({
    data: postsData || [],
    navigation: {
      itemsPerPage: topicPerPage,
      currentPage: +page,
      maxPage,
    },
  });
}
