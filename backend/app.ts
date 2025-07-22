import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import expressSession from "./middleware/express-session";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(expressSession());

app.get("/session-test", (req, res) => {
  if (req.session.views) req.session.views += 1;
  else req.session.views = 1;
  return res.send(`Your connection counter is ${req.session.views}!`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 (http://localhost:3000)");
});
