import { AppError } from "../../utils/AppError";

const isDev = process.env.NODE_ENV === "development";

import { Response, Request } from "express";
import * as bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "../../database/connection";

import { checkUserExist } from "../dbqueries/user/checkUserExist";
import { logout } from "../dbqueries/user/logout";

import forumConfig from "../../forum.config";
const { USER_ACCOUNTS_LIMIT } = forumConfig;

import { ResponseValidateData, RegisterData } from "../../types/types";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum name length is 3!" })
    .max(35, { message: "Maximum name length is 35!" }),
  login: z
    .string()
    .min(3, { message: "Minimum login length is 3!" })
    .max(18, { message: "Maximum login length is 18!" }),
  password: z
    .string()
    .min(5, { message: "Minimum password length is 5!" })
    .max(64, { message: "Maximum password length is 64!" }),
});

export function validateRegisterData(data: RegisterData): ResponseValidateData {
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    const error = JSON.parse(result.error.message);
    const firstError = error[0];
    return { error: firstError.message };
  }

  return { success: "OK" };
}

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

  // Unbind any previous session
  // After success register process user does not have to log in
  await logout(sessionId);

  try {
    await prisma.user.create({
      data: {
        login,
        name,
        password: hashedPassword,
        sessionId,
        addressIp: userIp,
      },
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (e: any) {
    if (isDev) console.error(e);
    throw new Error("Occured error while creating user!");
  }
}
