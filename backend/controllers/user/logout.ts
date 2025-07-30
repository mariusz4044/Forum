import { Request, Response } from "express";
import { logout } from "../dbqueries/user/logout";

export async function logoutUser(req: Request, res: Response) {
  await logout(req.session.id);

  req.session.destroy((err) => {
    if (err) return res.status(401).send(err);
    return res.status(200).send({ message: "Logout successfully!" });
  });
}
