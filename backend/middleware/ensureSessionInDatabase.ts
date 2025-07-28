import express from "express";
import { prisma } from "../database/connection";
const router = express.Router();
import { AppError } from "../utils/AppError";

const ensureSessionInDatabase = async (req, res, next) => {
  //we need ensure session exist, after register/login session will be connected to user model.

  if (!req.session.id) {
    throw new AppError("Please refresh page!");
  }

  if (req.session.databaseSaved === true) {
    return next();
  }

  try {
    const existingSession = await prisma.session.findUnique({
      where: { id: req.session.id },
      select: { id: true },
    });

    if (!existingSession) {
      await new Promise<void>((resolve, reject) => {
        req.session.save((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }

    req.session.databaseSaved = true;

    next();
  } catch (error) {
    console.error("Error ensuring session in database:", error);
    throw new AppError("Session error occurred");
  }
};

router.use("/", ensureSessionInDatabase);

export default router;
