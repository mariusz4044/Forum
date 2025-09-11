import { Request, Response } from "express";
import { prisma } from "../../database/connection";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/AppError";

export default async function changePassword(req: Request, res: Response) {
  const { password, newPassword } = req.body;

  const comparePassword = await bcrypt.compare(password, req.user!.password);
  if (!comparePassword) {
    throw new AppError("Old password is incorrect!");
  }

  const newCryptedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: req.user!.id },
    data: {
      password: newCryptedPassword,
    },
  });

  res.status(200).send({ message: "Password changed successfully." });
}
