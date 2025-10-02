import { User } from "@/context/UserContext";
import { number } from "motion";
import { ReactNode } from "react";

export type PostAuthor = User & {
  totalPosts: number;
};

export interface Location {
  href: string;
  id: number;
  name: string;
}

export interface PostProps {
  author: PostAuthor;
  ratingSummary: number;
  createdAt: string;
  message: string;
  editedMessage?: string;
  id: number;
  topicId: number;
}

export type UserSettingsData = {
  id: number;
  login: string;
  name: string;
  role: Pick<User, "role">;
  reputation: number;
  rateGiven: number;
  bansReceived: number;
  reports: number;
  topicsCreated: number;
  totalPosts: number;
};

export interface TopicResponseData {
  createdAt: string;
  title: string;
  posts: PostProps[];
  categoryId: number;
  createdBy: User;
  isOpen: boolean;
  id: number;
  category: Category;
}

export interface LastPost {
  topic: {
    id: number;
    title: string;
  };
  author: User;
  message: string;
  createdAt: string;
}

export interface Category extends LastPost {
  id: number;
  image: string;
  title: string;
  description: string;
  topicsCount: number;
  categoryId: number;
  lastPost: LastPost;
}

export type UserBestPosts = User & {
  totalPosts: number;
};

export interface StatisticPost extends PostProps {
  topic: { id: number; title: string };
}

export type Section = {
  id: number;
  title: string;
  createdAt: string;
};

interface UserWithPostCount extends User {
  totalPosts: number;
}

export interface SectionProps extends Section {
  categories: Category[];
}

export interface StatisticsData {
  lastPosts: StatisticPost[];
  bestPosters: UserWithPostCount[];
  lastTopics: TopicResponseData[];
  sections: Section[];
}

export type Cursor = {
  next: number;
  prev: number;
};

export interface NavigationData {
  currentPage: number;
  maxPage: number;
  itemsPerPage: number;
  cursors: Cursor;
}

export interface PageNavigationProps {
  children?: ReactNode;
  reversed?: boolean;
  navigation: NavigationData;
  onChangePage: (
    pageNumber: number,
    data: NavigationData,
    scrollAfterPostId?: string,
  ) => void;
}

export interface StatsData {
  totalUsers: number;
  lastUser: User & { createdAt: string };
  totalTopics: number;
  totalPosts: number;
}

type TopicWithCategory = TopicResponseData & {
  category: Category;
};

export interface PostsResponseData {
  posts: PostProps[];
  topic: TopicWithCategory;
}

export interface TopicResponse {
  data: PostsResponseData;
  navigation: NavigationData;
}
