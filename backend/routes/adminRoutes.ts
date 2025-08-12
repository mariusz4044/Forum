import { Router } from "express";
import { deletePost } from "../controllers/admin/deletePost";
import authAdmin from "../middleware/auths/authAdmin";

const router = Router();

router.delete("/post/delete", authAdmin, deletePost);

export default router;
