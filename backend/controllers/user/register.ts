import { Response } from "express";
import { z } from "zod";

interface RegisterData {
  name: string;
  password: string;
  login: string;
}

interface ResponseValidate {
  error?: string;
  success?: string;
  patch?: [string];
}

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

export function validateRegisterData(data: RegisterData): ResponseValidate {
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    const error = JSON.parse(result.error.message);
    const firstError = error[0];
    return { error: firstError.message };
  }

  return { success: "OK" };
}

export async function register(res: Response, body: RegisterData) {
  return res.status(200).send({ success: "OK" });
}
