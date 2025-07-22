import Router from "express";
const router = Router();

import { register, validateRegisterData } from "../controllers/user/register";

router.post("/register", async (req, res) => {
  const { error } = validateRegisterData(req.body);
  if (error) return res.status(400).send({ error });
  return await register(res, req.body);
});

router.get("/login", (req, res) => {
  return res.send("Hi login!");
});

export default router;
