import { Request, ErrorRequestHandler } from "express";

export async function saveExpressSession(req: Request) {
  await new Promise<void>((resolve, reject) => {
    req.session.save((err: ErrorRequestHandler) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
