import { User } from "@/context/UserContext";

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
  editedMessage?: string;
  id: number;
}

export interface TopicResponseData {
  createdAt: string;
  title: string;
  posts: PostProps[];
  categoryId: number;
  createdBy: User;
  isOpen: boolean;
  id: number;
  _count: { count: number };
}
