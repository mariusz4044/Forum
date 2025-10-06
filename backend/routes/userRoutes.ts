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
import {
  changePasswordSchema,
  loginSchema,
  registerSchema,
} from "../middleware/zodSchemas/schemas";
import { setAvatar } from "../controllers/user/setAvatar";
import getUsersSettings from "../controllers/user/getUserSettings";
import changePassword from "../controllers/user/changePassword";

router.get("/", authorization, async (req, res) => {
  const userData = await getUserData(req);
  return res.status(200).send(userData);
});

router.post("/register", validateBody(registerSchema), authCaptcha, register);
router.post("/login", validateBody(loginSchema), loginFn);
router.post("/logout", authorization, logoutUser);
router.get("/profile/:userId", getUserProfile);
router.get("/settings", authorization, getUsersSettings);

router.patch("/avatar", authorization, setAvatar);
router.patch(
  "/password",
  validateBody(changePasswordSchema),
  authorization,
  changePassword,
);

export default router;
