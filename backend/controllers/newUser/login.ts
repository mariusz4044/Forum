import { Response, Request } from "express";
//@ts-ignore
import bcrypt from "bcrypt";
import { getUniqueUser } from "../dbqueries/user/getUniqueUser";
import { User } from "@prisma/client";
import findActiveBan from "../../utils/findActiveBan";

//types
import type { LoginBody } from "../../types/types";
import { updateUniqueUser } from "../dbqueries/user/updateUniqueUser";
import { AppError } from "../../utils/AppError";
import specifyUserData from "../../utils/specifyUserData";

export async function login(req: Request, res: Response) {
  const { login, password }: LoginBody = req.body;
  const sessionId = req.session.id;

  if (!login || !password) {
    throw new AppError("Login and Password field is required!");
  }

  const findUser: User | false = await getUniqueUser({
    where: { login },
    include: {
      bansReceived: true,
    },
  });

  if (!findUser) {
    throw new AppError("Invalid login data!");
  }

  const comparePassword = await bcrypt.compare(password, findUser.password);
  if (!comparePassword) {
    throw new AppError("Invalid login data!");
  }

  const isActiveBan = findActiveBan(findUser.bansReceived);
  if (isActiveBan) {
    throw new AppError(
      "Your Account is banned!",
      {
        reason: isActiveBan.reason,
        endTime: isActiveBan.endTime,
        banned: true,
      },
      403,
    );
  }

  //update user session
  const updatedUser = await updateUniqueUser({
    where: { login },
    data: {
      sessionId,
    },
  });

  return res.status(200).send({
    success: "Successfully logged in!",
    data: {
      ...specifyUserData(updatedUser),
    },
  });
}
