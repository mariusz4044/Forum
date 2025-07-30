import { Response, Request } from "express";
import { UserData } from "../../types/types";
import { getUniqueUser } from "../dbqueries/user/getUniqueUser";
import { AppError } from "../../utils/AppError";
import { getUserBySession } from "../dbqueries/user/getUserBySession";

export async function getUserData(
  req: Request,
  res: Response,
): Promise<UserData> {
  const sessionId = req.session.id;

  const user = await getUserBySession(sessionId, true);

  if (!user) throw new AppError("No user found!");

  return user;
}
