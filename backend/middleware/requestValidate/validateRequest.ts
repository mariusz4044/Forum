import express from "express";
const router = express.Router();

router.use("/", (req, res, next) => {
  if (req.method === "POST" && !req.body) {
    return res
      .status(400)
      .send({ error: "Please send valid JSON data in POST request!" });
  }

  next();
});

export default router;
