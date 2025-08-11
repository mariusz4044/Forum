import checkUserSession from "./middleware/ensureSessionInDatabase";

const isDev = process.env.NODE_ENV !== "production";

import dotenv from "dotenv";
import express, { ErrorRequestHandler, Request, Response } from "express";
import cors from "cors";

import expressSession from "./middleware/express-session";
import userRoutes from "./routes/userRoutes";
import validateRequest from "./middleware/requestValidate/validateRequest";
import getUserIp from "./middleware/getUserIp";
import ensureSessionInDatabase from "./middleware/ensureSessionInDatabase";
import forumRoutes from "./routes/forumRoutes";
import adminRoutes from "./routes/adminRoutes";
import { AppError, AppErrorProps } from "./utils/AppError";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(expressSession());

//Middleware
app.use("/", validateRequest);
app.use("/", ensureSessionInDatabase);
app.use("/", getUserIp);

//User routes
app.use("/api/user", userRoutes);

//Admin routes
app.use("/api/", adminRoutes);

//Forum routers
app.use("/api/forum", forumRoutes);

//global error handler
app.use((err: AppErrorProps, req: Request, res: Response) => {
  if (err.name === "AppError") {
    return res.status(err.status).json({ error: err.message, data: err.data });
  }

  const errRes = isDev
    ? { error: "Internal Server Error", err }
    : { error: "Internal Server Error" };

  res.status(500).json(errRes);
});

app.listen(2137, () => {
  console.log("Server is running on port 3000 (http://localhost:3000)");
});

export const router = express.Router();
