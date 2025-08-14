import { Router } from "express";
import { deletePost } from "../controllers/admin/deletePost";
import authAdmin from "../middleware/auths/authAdmin";
import { editPost } from "../controllers/admin/editPost";
import { banUser } from "../controllers/admin/banUser";
import { deleteAllPosts } from "../controllers/admin/deleteAllPosts";

const router = Router();

router.delete("/posts/delete", authAdmin, deleteAllPosts);
router.delete("/post/delete", authAdmin, deletePost);
router.post("/post/edit", authAdmin, editPost);
router.post("/user/ban", authAdmin, banUser);

export default router;
