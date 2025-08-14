import { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { getUniqueUser } from "../../controllers/dbqueries/user/getUniqueUser";

export async function getUserProfile(req: Request, res: Response) {
  const { userId } = req.params;
  const parsedId = parseInt(userId);

  if (typeof parsedId !== "number") {
    throw new AppError("userId is number!");
  }

  const user = await getUniqueUser({
    where: { id: parsedId },
  });

  if (!user) {
    throw new AppError("User profile not found!");
  }

  return res.status(200).json({
    avatar: user.avatar,
    name: user.name,
    id: user.id,
    accountCreatedAt: user.createdAt,
    reputation: user.reputation,
    role: user.role,
  });
}
