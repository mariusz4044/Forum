import { User } from "@/context/UserContext";

export interface UserProfileData {
  avatar: string;
  name: string;
  id: number;
  createdAt: string;
  reputation: number;
  role: string;
  posts: number;
}

type PostAuthor = User & {
  _count: {
    posts: number;
  };
};

export interface PostProps {
  author: PostAuthor;
  ratingSummary: number;
  createdAt: string;
  message: string;
  id: number;
}

export interface TopicResponseData {
  createdAt: string;
  title: string;
  posts: PostProps[];
  categoryId: number;
  createdBy: User;
  _count: { count: number };
}
