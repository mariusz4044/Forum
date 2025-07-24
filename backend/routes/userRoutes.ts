import { Router } from "express";
const router = Router();

import {
  register,
  validateRegisterData,
} from "../controllers/newUser/register";

import { login } from "../controllers/newUser/login";

router.post("/register", async (req, res) => {
  const { error } = validateRegisterData(req.body);
  if (error) return res.status(400).send({ error });
  return await register(req, res);
});

router.post("/login", async (req, res) => {
  return await login(req, res);
});

export default router;
