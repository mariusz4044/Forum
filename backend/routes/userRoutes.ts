import { Router } from "express";
const router = Router();

import {
  register,
  validateRegisterData,
} from "../controllers/newUser/register";

import { loginFn } from "../controllers/newUser/login";
import { getUserData } from "../controllers/existUser/getUserData";
import authorization from "../middleware/auths/authUser";
import { logoutUser } from "../controllers/user/logout";

router.get("/", authorization, async (req, res) => {
  const userData = await getUserData(req, res);
  return res.status(200).send(userData);
});

router.post("/register", async (req, res) => {
  const { error } = validateRegisterData(req.body);
  if (error) return res.status(400).send({ error });
  return await register(req, res);
});

router.post("/login", loginFn);
router.post("/logout", authorization, logoutUser);

export default router;
