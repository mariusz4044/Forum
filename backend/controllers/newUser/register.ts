import { AppError } from "../../utils/AppError";

const isDev = process.env.NODE_ENV === "development";

import { Response, Request } from "express";
import * as bcrypt from "bcrypt";
import { prisma } from "../../database/connection";

import { checkUserExist } from "../dbqueries/user/checkUserExist";

import forumConfig from "../../forum.config";
const { USER_ACCOUNTS_LIMIT } = forumConfig;

import { RegisterData } from "../../types/types";
import { connectSession } from "../dbqueries/user/connectSession";
import { saveExpressSession } from "../../utils/saveExpressSession";

export async function register(req: Request, res: Response) {
  const { login, name, password }: RegisterData = req.body;

  const sessionId = req.session.id;
  const userIp = req.session.userIP ?? null;

  const hashedPassword = await bcrypt.hash(password, 12);
  const userExist = await checkUserExist(login, name);

  if (userExist) {
    throw new AppError("User login or name already exist");
  }

  const multiAccounts = await prisma.user.findMany({
    where: { addressIp: userIp },
  });

  if (multiAccounts.length > USER_ACCOUNTS_LIMIT) {
    throw new AppError("Your cannot create more accounts!");
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        login,
        name,
        password: hashedPassword,
        addressIp: userIp,
      },
      select: {
        id: true,
        avatar: true,
        name: true,
        role: true,
        points: true,
      },
    });

    //Expres-session not saved if user dont' have data
    await saveExpressSession(req);
    await connectSession(newUser.id, sessionId);
    req.session.captchaAnswer = null;

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (e: any) {
    if (isDev) console.error(e);
    throw new Error("Occurred error while creating user!");
  }
}
