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
import { validateBody } from "../middleware/validateBody";
import {
  createCategorySchema,
  createPostSchema,
  createRateSchema,
  createSectionSchema,
  createTopicSchema,
  deleteAllPostsSchema,
} from "../middleware/zodSchemas/schemas";

const router = Router();

router.get("/", getInitData);
router.get("/topic/:id", getPosts);
router.get("/category/:id", getCategoryTopics);

router.post("/rate", validateBody(createRateSchema), authUser, createRate);

router.post(
  "/post/create",
  validateBody(createPostSchema),
  authUser,
  createPost,
);

router.post(
  "/section/create",
  validateBody(createSectionSchema),
  authAdmin,
  createSection,
);

router.post(
  "/category/create",
  validateBody(createCategorySchema),
  authAdmin,
  createCategory,
);

router.post(
  "/topic/create",
  validateBody(createTopicSchema),
  authUser,
  createTopic,
);

export default router;
