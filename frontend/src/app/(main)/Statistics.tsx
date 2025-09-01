import {
  StatisticPost,
  StatisticsData,
  TopicResponseData,
  UserBestPosts,
} from "@/types/types";
import { UserAvatar } from "@/components/Utils/UserAvatar";
import { UserNick } from "@/components/Utils/UserNick";
import { timeAgo } from "@/functions/timeAgo";
import { ReactNode } from "react";
import Link from "next/link";
import { formatNumber } from "@/components/Utils/formatNumbers";

export function LastPostStatistic({ post }: { post: StatisticPost }) {
  const { author, topic, createdAt } = post;

  return (
    <div className="px-4 py-3 border-b-1 border-[#5669db1a]">
      <div className="flex flex-row gap-2 text-[#94a3b8] text-sm items-center justify-between ">
        <div className="flex flex-row gap-2 items-center ">
          <UserAvatar user={author} className="size-7 rounded-full" />
          <span className="font-medium">
            <UserNick user={author}></UserNick>
          </span>
        </div>
        <div className="text-[#94a3b8]/[0.6] font-light text-[12px] tracking-wide relative bottom-1">
          {timeAgo(createdAt)} ago
        </div>
      </div>
      <Link href={`/topic/${topic.id}`}>
        <div className="text-[14px] w-full mt-2 font-medium">{topic.title}</div>
      </Link>
    </div>
  );
}

export function LastTopicStatistic({ topic }: { topic: TopicResponseData }) {
  const { createdBy, title, createdAt, id } = topic;

  return (
    <div className="px-4 py-3 border-b-1 border-[#5669db1a]">
      <div className="flex flex-row gap-2 text-[#94a3b8] text-sm items-center justify-between ">
        <div className="flex flex-row gap-2 items-center ">
          <UserAvatar user={createdBy} className="size-7 rounded-full" />
          <span className="font-medium">
            <UserNick user={createdBy}></UserNick>
          </span>
        </div>
        <div className="text-[#94a3b8]/[0.6] font-light text-[12px] tracking-wide relative bottom-1">
          {timeAgo(createdAt)} ago
        </div>
      </div>
      <Link href={`/topic/${id}`}>
        <div className="text-[14px] w-full mt-2 font-medium">{title}</div>
      </Link>
    </div>
  );
}

export function ForumBox({ children }: { children: ReactNode }) {
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

export function ForumBoxHeader({ children }: { children: ReactNode }) {
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

function ForumBoxContent({ children }: { children: ReactNode }) {
  return <h1>{children}</h1>;
}

function PositionRanking({
  rank,
  user,
}: {
  rank: number;
  user: UserBestPosts;
}) {
  let rankClass = "rank-default";

  switch (rank) {
    case 1:
      rankClass = "rank-first";
      break;
    case 2:
      rankClass = "rank-second";
      break;
    case 3:
      rankClass = "rank-third";
      break;
    default:
      rankClass = "rank-default";
  }

  return (
    <div className="flex justify-between px-4 py-4 border-b-1 border-[#5669db1a]">
      <div className="flex flex-row gap-2">
        <div
          className={`px-2 rounded-full text-[13px] font-medium flex justify-center items-center ${rankClass}`}
        >
          {rank}
        </div>
        <div className="flex flex-row gap-2 items-center text-[#e2e8f0] text-sm">
          <UserAvatar user={user} className="size-5.5 rounded-full" />
          <span className="font-medium">
            <UserNick user={user} />
          </span>
        </div>
      </div>
      <div className="text-[11px] flex items-center gap-0.5">
        <span className="text-[#8b5cf6] font-medium">
          {formatNumber(user._count.posts)}
        </span>
        <span className="text-[#94a3b8]">posts</span>
      </div>
    </div>
  );
}

export function Statistics({ data }: { data: StatisticsData }) {
  const LastTopics = [];
  for (let i in data.lastTopics) {
    const topic: TopicResponseData = data.lastTopics[i];
    LastTopics.push(<LastTopicStatistic topic={topic} key={`topics-${i}`} />);
  }

  const LastPosts = [];
  for (let i in data.lastPosts) {
    const post: StatisticPost = data.lastPosts[i];
    LastPosts.push(<LastPostStatistic post={post} key={`post-${i}`} />);
  }

  const BestPosters = [];
  for (let i in data.bestPosters) {
    const user = data.bestPosters[i];
    if (!user.name) continue;
    BestPosters.push(
      <PositionRanking rank={+i + 1} user={user} key={`poster-${i}`} />,
    );
  }

  return (
    <>
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
    </>
  );
}
