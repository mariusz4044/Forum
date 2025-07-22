import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import expressSession from "./middleware/express-session";
import userRoutes from "./routes/userRoutes";
import validateRequest from "./middleware/requestValidate/validateRequest";
import getUserIp from "./middleware/getUserIp";
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
app.use("/", getUserIp);

//User routes
app.use("/api/user", userRoutes);

app.get("/get-session", (req, res) => {
  res.status(200).send(`Session ID: ${req.session.id}!`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 (http://localhost:3000)");
});

export const router = express.Router();
