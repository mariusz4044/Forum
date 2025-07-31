import { getUserBySession } from "../../controllers/dbqueries/user/getUserBySession";
import { AppError } from "../../utils/AppError";
import { Response, Request, NextFunction } from "express";
import { User } from "@prisma/client";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.id) throw new AppError("No such session!");

  const user = await getUserBySession(req.session.id);
  if (!user) throw new AppError("You are not authorized to use this!");

  req.user = user;
  next();
};
