const isDev = process.env.NODE_ENV !== "production";

import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";

import { AppErrorProps } from "./utils/AppError";
import expressSession from "./middleware/express-session";
import userRoutes from "./routes/userRoutes";
import validateRequest from "./middleware/requestValidate/validateRequest";
import getUserIp from "./middleware/getUserIp";
import forumRoutes from "./routes/forumRoutes";
import adminRoutes from "./routes/adminRoutes";
import captchaRoutes from "./routes/captchaRoutes";
import { CacheManager } from "./utils/cacheManager";
import { getInitQuery } from "./controllers/dbqueries/forum/getInitQuery";

dotenv.config();

const app = express();

app.use(express.json({ limit: "512kb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(expressSession());

//Cache manager
export const cm = new CacheManager(5000);
cm.add("forumInit", getInitQuery);
cm.start();

//Middleware
app.use("/", validateRequest);
app.use("/", getUserIp);
app.use("/api/captcha", captchaRoutes);

//User routes
app.use("/api/user", userRoutes);

//Admin routes
app.use("/api/", adminRoutes);

//Forum routers
app.use("/api/forum", forumRoutes);

//global error handler
app.use((err: AppErrorProps, req: Request, res: Response, next: any) => {
  if (err.name === "AppError") {
    return res.status(err.status).json({ error: err.message, data: err.data });
  }

  console.log(err);

  if (isDev) {
    return res.status(500).json({ error: "Internal Server Error", err });
  }

  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(2137, () => {
  console.log("Server is running on port 3000 (http://localhost:3000)");
});

export const router = express.Router();
