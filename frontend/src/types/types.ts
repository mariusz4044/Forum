import { User } from "@/context/UserContext";

export interface PostProps {
  author: {
    name: string;
    avatar: string;
    role: string;
    _count: {
      posts: number;
    };
    reputation: number;
  };
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
