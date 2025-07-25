import { Response, Request } from "express";
import { UserData } from "../../types/types";
import { getUniqueUser } from "../dbqueries/user/getUniqueUser";
import { AppError } from "../../utils/AppError";
import specifyUserData from "../../utils/specifyUserData";

export async function getUserData(
  req: Request,
  res: Response,
): Promise<UserData> {
  const user = await getUniqueUser({
    where: { sessionId: req.session.id },
  });

  if (!user) throw new AppError("No user found!");

  return specifyUserData(user);
}
