import { Router } from "express";
const router = Router();

import { register } from "../controllers/newUser/register";
import { loginFn } from "../controllers/newUser/login";
import { getUserData } from "../controllers/existUser/getUserData";
import authorization from "../middleware/auths/authUser";
import { logoutUser } from "../controllers/user/logout";
import { getUserProfile } from "../controllers/forum/getUserProfile";
import authCaptcha from "../middleware/auths/authCaptcha";
import { validateBody } from "../middleware/validateBody";
import { loginSchema, registerSchema } from "../middleware/zodSchemas/schemas";

router.get("/", authorization, async (req, res) => {
  const userData = await getUserData(req, res);
  return res.status(200).send(userData);
});

router.post("/register", validateBody(registerSchema), authCaptcha, register);

router.post("/login", validateBody(loginSchema), loginFn);
router.post("/logout", authorization, logoutUser);

router.get("/profile/:userId", getUserProfile);

export default router;
