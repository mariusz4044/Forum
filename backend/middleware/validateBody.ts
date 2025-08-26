import { RequestHandler } from "express";
import { z, ZodType } from "zod";
import { AppError } from "../utils/AppError";

export const validateBody = <T>(schema: ZodType<T>): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      const field = firstIssue.path.join(".") || "body";
      let msg = firstIssue.message.replace(/^Invalid input:\s*/, "");
      throw new AppError(`${msg}`, 400);
    }

    (req as any).body = result.data;
    next();
  };
};
