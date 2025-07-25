import express from "express";
const router = express.Router();
import { AppError } from "../utils/AppError";

router.use("/", (req, res, next) => {
  if (!req.session.id) throw new AppError("Please reflesh page!");
  next();
});

export default router;
