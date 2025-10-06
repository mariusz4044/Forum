import { Request, Response } from "express";
import { getPostsQuery } from "../dbqueries/forum/getPostsQuery";
import { AppError } from "../../utils/AppError";

const postsPerPage = parseInt(`${process.env.POSTS_PER_PAGE}`);

export async function getPosts(req: Request, res: Response) {
  const { page = 1, cursor = 0, direction = "next", type } = req.query;
  const { id } = req.params;

  if (!id) {
    throw new Error("Topic not found");
  }

  if (direction !== "next" && direction !== "prev") {
    throw new AppError("Invalid direction!");
  }

  if (Number.isNaN(cursor)) {
    throw new AppError("Invalid cursor!");
  }

  if (type && req.user!.role !== "ADMIN") {
    throw new AppError("Access denied!");
  }

  const { topic, posts } = await getPostsQuery({
    topicId: parseInt(id),
    cursor: Number(cursor),
    direction: direction,
    page: Number(page),
    take: postsPerPage,
  });

  let maxPage = 1;
  if (topic?.postsCount) {
    maxPage = Math.ceil(topic.postsCount / postsPerPage);
  }

  res.status(200).json({
    data: { topic, posts },
    navigation: {
      itemsPerPage: postsPerPage,
      currentPage: +page,
      maxPage,
      cursors: {
        next: posts[posts.length - 1]?.id || null,
        prev: posts[0]?.id || null,
      },
    },
  });
}
