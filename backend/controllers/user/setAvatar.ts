import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "../../database/connection";
import { AppError } from "../../utils/AppError";

const AVATARS_PATH = process.env.AVATARS_PATH as string;

export async function setAvatar(req: Request, res: Response) {
  const { base64 } = req.body;

  if (!base64 || typeof base64 !== "string") {
    throw new AppError("Please provide correct image!");
  }

  const matches = base64.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!matches) {
    throw new AppError("Invalid image format!");
  }

  const mimeType = matches[1];
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(mimeType)) {
    throw new AppError("Invalid image format type!");
  }

  const buffer = Buffer.from(matches[2], "base64");
  if (buffer.length > 512 * 1024) {
    throw new AppError("Image size is too large (max. 512kb)!");
  }

  const nextAvatarTime = new Date(req.user!.lastAvatarChangeTs);
  nextAvatarTime.setSeconds(nextAvatarTime.getSeconds() + 4600);

  if (nextAvatarTime.getTime() > Date.now() && req.user?.role !== "ADMIN") {
    const remainingMs = nextAvatarTime.getTime() - Date.now();
    const remainingMinutes = Math.ceil(remainingMs / 1000 / 60);

    throw new AppError(
      `Wait ${remainingMinutes} minutes before upload new avatar!`,
    );
  }

  if (!fs.existsSync(AVATARS_PATH)) {
    fs.mkdirSync(AVATARS_PATH, { recursive: true });
  }

  const filename = `${uuidv4()}.webp`;
  const filepath = path.join(AVATARS_PATH, filename);

  await sharp(buffer)
    .resize(512, 512, { fit: "cover", position: "center" })
    .webp({ quality: 80 })
    .toFile(filepath);

  await prisma.user.update({
    where: { id: req.user!.id },
    data: {
      avatar: filename,
      lastAvatarChangeTs: new Date(),
    },
  });

  return res.status(200).json({
    message: "Successfully uploaded!",
  });
}
