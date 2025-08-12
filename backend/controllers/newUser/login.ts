import { Response, Request } from "express";
//@ts-ignore
import bcrypt from "bcrypt";
import { getUniqueUser } from "../dbqueries/user/getUniqueUser";
import { User } from "@prisma/client";
import { getActiveBan } from "../dbqueries/user/getActiveBan";

//types
import type { LoginBody } from "../../types/types";
import { updateUniqueUser } from "../dbqueries/user/updateUniqueUser";
import { AppError } from "../../utils/AppError";
import { connectSession } from "../dbqueries/user/connectSession";
import { saveExpressSession } from "../../utils/saveExpressSession";

export async function loginFn(req: Request, res: Response) {
  const { login, password }: LoginBody = req.body;
  const sessionId = req.session.id;

  if (!login || !password) {
    throw new AppError("Login and Password field is required!");
  }

  const findUser: User | false = await getUniqueUser({
    where: { login },
    select: {
      id: true,
      avatar: true,
      name: true,
      role: true,
      points: true,
      password: true,
    },
  });

  if (!findUser) {
    throw new AppError("Login or password is incorrect!");
  }

  const comparePassword = await bcrypt.compare(password, findUser.password);
  if (!comparePassword) {
    throw new AppError("Invalid login data!");
  }

  const activeBan = await getActiveBan(findUser.id);

  if (activeBan) {
    throw new AppError(
      "Your Account is banned!",
      {
        reason: activeBan.reason,
        endTime: activeBan.endTime,
        banned: true,
      },
      403,
    );
  }

  //update user session
  await saveExpressSession(req);
  await connectSession(findUser.id, sessionId);

  return res.status(200).send({
    message: "Successfully logged in!",
    data: findUser,
  });
}
