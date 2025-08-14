import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { getUniqueUser } from "../../controllers/dbqueries/user/getUniqueUser";
import { User } from "@prisma/client";

type UserWithPostCount = User & {
  _count?: {
    posts: number;
  };
};

export async function getUserProfile(req: Request, res: Response) {
  const { userId } = req.params;
  const parsedId = parseInt(userId);

  if (typeof parsedId !== "number") {
    throw new AppError("userId is number!");
  }

  const user: UserWithPostCount | false = await getUniqueUser({
    where: { id: parsedId },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError("User profile not found!");
  }

  return res.status(200).json({
    avatar: user.avatar,
    name: user.name,
    id: user.id,
    createdAt: user.createdAt,
    reputation: user.reputation,
    role: user.role,
    posts: user._count?.posts,
  });
}
