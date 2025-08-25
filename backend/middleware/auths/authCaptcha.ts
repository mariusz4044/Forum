import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";

export default async (req: Request, res: Response, next: NextFunction) => {
  const {captcha} = req.body;

  if(!req.session.captchaAnswer || captcha !== req.session.captchaAnswer) {
    throw new AppError("Wrong captcha answer", );
  }
  
  next();
};
