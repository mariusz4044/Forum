import { Router } from "express";
import { createSection } from "../controllers/forum/createSection";
import authAdmin from "../middleware/auths/authAdmin";
import authUser from "../middleware/auths/authUser";
import { createTopic } from "../controllers/forum/createTopic";
import { createCategory } from "../controllers/forum/createCategory";
import { getInitData } from "../controllers/forum/getInitData";
import { createPost } from "../controllers/forum/createPost";
import { getCategoryTopics } from "../controllers/forum/getCategoryTopics";
import { getPosts } from "../controllers/forum/getPosts";
import { createRate } from "../controllers/forum/createRate";

const router = Router();

router.get("/", getInitData);
router.get("/topic/:id", getPosts);
router.get("/category/:id", getCategoryTopics);
router.post("/rate", authUser, createRate);
router.post("/post/create", authUser, createPost);
router.post("/section/create", authAdmin, createSection);
router.post("/category/create", authAdmin, createCategory);
router.post("/topic/create", authUser, createTopic);

export default router;
