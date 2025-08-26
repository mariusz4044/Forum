import z from "zod";

export const postIdSchema = z
  .number()
  .min(1, { message: "Post ID must be a number greater than 0!" });
export const topicIdSchema = z
  .number()
  .min(1, { message: "Topic ID must be a number greater than 0!" });
export const userIdSchema = z
  .number()
  .min(1, { message: "User ID must be a number greater than 0!" });
export const sectionIdSchema = z
  .number()
  .min(1, { message: "Section ID must be a number greater than 0!" });
export const titleSchema = z
  .string()
  .min(1, { message: "Title cannot be empty!" })
  .max(50, { message: "Title can have a maximum of 50 characters!" });
export const categoryIdSchema = z
  .number()
  .min(1, { message: "Category ID must be a number greater than 0!" });

export const loginSchema = z.object({
  login: z
    .string()
    .min(3, { message: "Login must have at least 3 characters!" }),
  password: z
    .string()
    .min(3, { message: "Password must have at least 3 characters!" }),
});

export const deleteAllPostsSchema = z.object({
  userId: userIdSchema,
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must have at least 3 characters!" })
    .max(35, { message: "Name can have a maximum of 35 characters!" }),
  login: z
    .string()
    .min(3, { message: "Login must have at least 3 characters!" })
    .max(18, { message: "Login can have a maximum of 18 characters!" }),
  password: z
    .string()
    .min(5, { message: "Password must have at least 5 characters!" })
    .max(64, { message: "Password can have a maximum of 64 characters!" }),
  captcha: z
    .string()
    .length(4, { message: "Captcha must be exactly 4 characters!" }),
});

export const createTopicSchema = z.object({
  title: titleSchema,
  categoryId: categoryIdSchema,
  message: z.string().min(1, { message: "Message cannot be empty!" }),
});

export const createSectionSchema = z.object({
  title: titleSchema,
});

export const createRateSchema = z.object({
  rate: z.union([z.literal(1), z.literal(-1)], {
    message: "Rate must be 1 (upvote) or -1 (downvote)!",
  }),
  postId: postIdSchema,
});

export const createPostSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Message cannot be empty!" })
    .max(1024, { message: "Message can have a maximum of 1024 characters!" }),
  topicId: topicIdSchema,
  blockResponse: z.boolean().optional(),
});

export const createCategorySchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title cannot be empty!" })
    .max(50, { message: "Title can have a maximum of 50 characters!" }),
  description: z
    .string()
    .min(1, { message: "Description cannot be empty!" })
    .max(512, { message: "Description can have a maximum of 512 characters!" }),
  sectionId: sectionIdSchema,
});

export const banSchema = z.object({
  userId: userIdSchema,
  reason: z
    .string()
    .min(1, { message: "Ban reason cannot be empty!" })
    .max(50, { message: "Ban reason can have a maximum of 50 characters!" }),
  banLength: z
    .number()
    .min(1, { message: "Ban length must be at least 1 day!" }),
});

export const deleteTopicSchema = z.object({
  topicId: topicIdSchema,
});

export const topicEditSchema = z.object({
  topicId: topicIdSchema,
  status: z.boolean({ message: "Status must be true or false!" }),
});

export const editPostSchema = z.object({
  postId: postIdSchema,
  message: z.string().min(1, { message: "Message cannot be empty!" }),
  reason: z.string().optional(),
});

export const deletePostSchema = z.object({
  postId: postIdSchema,
});
