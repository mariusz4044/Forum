import { Router } from "express";
import { createSection } from "../controllers/forum/createSection";
import authAdmin from "../middleware/auths/authAdmin";
import authUser from "../middleware/auths/authUser";
import { createTopic } from "../controllers/forum/createTopic";
import { createSubSection } from "../controllers/forum/createSubSection";
import { getInitData } from "../controllers/forum/getInitData";
import { createPost } from "../controllers/forum/createPost";

const router = Router();

router.get("/", getInitData);
router.post("/post/create", authUser, createPost);
router.post("/section/create", authAdmin, createSection);
router.post("/subSection/create", authAdmin, createSubSection);
router.post("/topic/create", authUser, createTopic);

export default router;
