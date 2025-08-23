import { Router } from "express";
import { generateCaptcha } from "../middleware/generateCaptcha";
import type { Captcha } from "middleware/generateCaptcha";

const router = Router();

declare module "express-session" {
  interface SessionData {
    captchaAnswer?: string|null;
  }
}

export default router.get("/", async (req, res) => {
  const { data, answer }: Captcha = await generateCaptcha();
  req.session.captchaAnswer = answer;
  res.send(`${data}`);
});


