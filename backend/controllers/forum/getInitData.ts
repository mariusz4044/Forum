import { Request, Response } from "express";
import { cm } from "../../app";

export async function getInitData(req: Request, res: Response) {
  const initData = cm.get('forumInit')
  res.status(200).json(initData);
}
