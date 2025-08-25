"use client";

import TopicHeader from "@/components/Utils/Forum/TopicHeader";
import Topic from "@/components/Utils/Forum/Topic";

import useSWR from "swr";
import fetcherGet from "@/functions/fetcherGet";
import Loading from "@/components/Utils/Universal/Loading";
import { User } from "@/context/UserContext";
import { UserNick } from "@/components/Utils/UserNick";
import { PostProps, TopicResponseData } from "@/types/types";
import { TopicProps } from "../category/[categoryId]/page";
import { timeAgo } from "@/functions/timeAgo";
import Link from "next/link";
import { UserAvatar } from "@/components/Utils/UserAvatar";
import { formatNumber } from "@/components/Utils/formatNumbers";

export interface LastPost {
  topic: {
    id: number;
    title: string;
  };
  author: User;
  message: string;
  createdAt: string;
}

interface Category extends LastPost {
  id: number;
  title: string;
  description: string;
  _count: {
    topics: number;
  };
  categoryId: number;
  lastPost: LastPost;
}

interface Section {
  id: number;
  title: string;
  categories: Category[];
}

type UserBestPosts = User & {
  _count: { posts: number };
};

function ForumBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-w-1/3 bg-[#1a1a2ecc] min-h-32 mt-4 rounded-xl max-sm:w-full"
      style={{
        border: "1px solid rgba(86, 105, 219, 0.2)",
      }}
    >
      {children}
    </div>
  );
}

function ForumBoxHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full rounded-t-lg h-12 bg-[#1a1a2ecc] flex items-center text-md pl-4 font-medium"
      style={{
        background:
          "linear-gradient(90deg, rgb(55 47 179 / 80%), rgb(52 32 99 / 80%))",
      }}
    >
      <h1>{children}</h1>
    </div>
  );
}

function ForumBoxContent({ children }: { children: React.ReactNode }) {
  return <h1>{children}</h1>;
}

function LastPostStatistic({
  user,
  createdAt,
  title,
  redir,
}: {
  user: User;
  createdAt: string;
  title: string;
  redir: string;
}) {
  return (
    <div className="px-4 py-3 border-b-1 border-[#5669db1a]">
      <div className="flex flex-row gap-2 text-[#94a3b8] text-sm items-center justify-between ">
        <div className="flex flex-row gap-2 items-center ">
          <UserAvatar
            user={user}
            className="size-7 rounded-full"
          />
          <span className="font-medium">
            <UserNick user={user}></UserNick>
          </span>
        </div>
        <div className="text-[#94a3b8]/[0.6] font-light text-[12px] tracking-wide relative bottom-1">
          {timeAgo(createdAt)} ago
        </div>
      </div>
      <Link href={redir}>
        <div className="text-[14px] w-full mt-2 font-medium">{title}</div>
      </Link>
    </div>
  );
}

function PositionRanking({
  rank,
  user,
}: {
  rank: number;
  user: UserBestPosts;
}) {
  let styleRank = {};

  switch (rank) {
    case 1: {
      styleRank = styleRank = {
        background: "linear-gradient(135deg, #ffd700, #ffed4e)",
        color: "#1a1a1a",
      };
      break;
    }
    case 2: {
      styleRank = styleRank = {
        background: "linear-gradient(135deg, #c0c0c0, #e5e5e5)",
        color: "#1a1a1a",
      };
      break;
    }
    case 3: {
      styleRank = styleRank = {
        background: "linear-gradient(135deg, #cd7f32, #daa520)",
        color: "white",
      };
      break;
    }
    default: {
      styleRank = {
        background: "#4f46e54d",
        color: "#a78bfa",
      };
    }
  }

  return (
    <div className="flex justify-between px-4 py-4 border-b-1 border-[#5669db1a]">
      <div className="flex flex-row gap-2">
        <div
          className={`px-2 rounded-full text-[13px] font-medium flex justify-center items-center`}
          style={styleRank}
        >
          {rank}
        </div>
        <div className="flex flex-row gap-2 items-center text-[#e2e8f0] text-sm">
          <UserAvatar
            user={user}
            className="size-5.5 rounded-full"
          />
          <span className="font-medium">
            <UserNick user={user} />
          </span>
        </div>
      </div>
      <div className="text-[11px] flex items-center gap-0.5">
        <span className="text-[#8b5cf6] font-medium">{formatNumber(user._count.posts)}</span>
        <span className="text-[#94a3b8]">posts</span>
      </div>
    </div>
  );
}

export default function Home() {
  const { data, error, isLoading } = useSWR(
    `${process.env.SERVER_URL}/api/forum`,
    fetcherGet,
    {
      shouldRetryOnError: false,
    },
  );

  if (data?.length === 0 || !data) {
    return;
  }

  const structure = [];

  for (const section of data.sections) {
    structure.push(
      <TopicHeader title={section.title} key={section.title} id={section.id} />,
    );

    section.categories.forEach((category: Category) => {
      structure.push(
        <Topic
          title={category.title}
          categoryId={category.id}
          description={category.description}
          iconPath="TopicIcons/topic1.png"
          messagesCount={category._count.topics}
          lastPost={category.lastPost}
          key={`${category.id}-${category.title}`}
        />,
      );
    });
  }

  const BestPosters = [];
  for (let i in data.bestPosters) {
    const user = data.bestPosters[i];
    if (!user.name) continue;
    BestPosters.push(
      <PositionRanking
        rank={+i + 1}
        user={user}
        key={`poster-${i}`}
      ></PositionRanking>,
    );
  }

  const LastTopics = [];
  for (let i in data.lastTopics) {
    const topic: TopicResponseData = data.lastTopics[i];
    LastTopics.push(
      <LastPostStatistic
        user={topic.createdBy}
        title={topic.title}
        redir={`/topic/${topic.id}`}
        createdAt={topic.createdAt}
        key={`topicstat-${i}`}
      />,
    );
  }

  const LastPosts = [];
  for (let i in data.lastPosts) {
    const post: PostProps & { topic: { id: number, title: string } } = data.lastPosts[i];
    LastPosts.push(
      <LastPostStatistic
        user={post.author}
        title={post.topic.title}
        redir={`/topic/${post.topic.id}`}
        createdAt={post.createdAt}
        key={`poststat-${i}`}
      />,
    );
  }

  return (
    <main className="w-full flex justify-center flex-row mt-10 gap-12 mb-10 max-sm:flex-col">
      <div className="w-[65%] h-full max-sm:w-full max-sm:p-4">{structure.length > 0 && structure}</div>
      <div className="w-[20%] max-w-80 h-full max-sm:w-full max-sm:max-w-full max-sm:p-4">
        <ForumBox>
          <ForumBoxHeader>💬 Best posters </ForumBoxHeader>
          <ForumBoxContent>{BestPosters}</ForumBoxContent>
        </ForumBox>
        <ForumBox>
          <ForumBoxHeader>📌 Last topics </ForumBoxHeader>
          <ForumBoxContent>{LastTopics}</ForumBoxContent>
        </ForumBox>
        <ForumBox>
          <ForumBoxHeader>📝 Last posts </ForumBoxHeader>
          <ForumBoxContent>{LastPosts}</ForumBoxContent>
        </ForumBox>
      </div>
    </main>
  );
}
