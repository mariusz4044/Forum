import { Router } from "express";
import { deletePost } from "../controllers/admin/deletePost";

const router = Router();

router.delete("/post/delete", deletePost);

export default router;
