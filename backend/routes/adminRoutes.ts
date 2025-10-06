import { Router } from "express";
import { deletePost } from "../controllers/admin/deletePost";
import authAdmin from "../middleware/auths/authAdmin";
import { editPost } from "../controllers/admin/editPost";
import { banUser } from "../controllers/admin/banUser";
import { deleteAllPosts } from "../controllers/admin/deleteAllPosts";
import { editTopicStatus } from "../controllers/dbqueries/admin/editTopicStatus";
import { deleteTopic } from "../controllers/admin/deleteTopic";
import { validateBody } from "../middleware/validateBody";
import {
  banSchema,
  deleteAllPostsSchema,
  bodyPostIdSchema,
  deleteTopicSchema,
  editPostSchema,
  topicEditSchema,
} from "../middleware/zodSchemas/schemas";
import { getReports } from "../controllers/admin/getReports";
import { clearReports } from "../controllers/admin/clearReports";

const router = Router();

router.delete(
  "/posts/delete",
  validateBody(deleteAllPostsSchema),
  authAdmin,
  deleteAllPosts,
);

router.delete(
  "/post/delete",
  validateBody(bodyPostIdSchema),
  authAdmin,
  deletePost,
);

router.post("/post/edit", validateBody(editPostSchema), authAdmin, editPost);

router.post(
  "/topic/editTopicStatus",
  validateBody(topicEditSchema),
  authAdmin,
  editTopicStatus,
);

router.delete(
  "/topic",
  validateBody(deleteTopicSchema),
  authAdmin,
  deleteTopic,
);

router.post("/user/ban", validateBody(banSchema), authAdmin, banUser);

router.get("/reports", authAdmin, getReports);

router.post(
  "/reports/clear",
  validateBody(bodyPostIdSchema),
  authAdmin,
  clearReports,
);

export default router;
