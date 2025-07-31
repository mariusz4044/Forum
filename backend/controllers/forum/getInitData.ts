import { Request, Response } from "express";
import { getInitQuery } from "../dbqueries/forum/getInitQuery";

export async function getInitData(req: Request, res: Response) {
  const initData = await getInitQuery();

  res.status(200).json(initData);
}
