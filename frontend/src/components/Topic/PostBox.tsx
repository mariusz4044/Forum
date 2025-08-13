import {
  ChartNoAxesCombined,
  Meh,
  Minus,
  Plus,
  Send,
  ShieldAlert,
  User,
} from "lucide-react";

import { formatDateToRelative } from "@/functions/formatDateToRelative";
import { fetchData } from "@/functions/fetchData";
import { useUserContext } from "@/context/UserContext";
import { ReportPostElement } from "@/components/Topic/ReportPostElement";
import { PostTools } from "@/components/Admin/PostTools";
import { PostProps } from "@/types/types";
import { useState } from "react";
import Badge, { BadgeColors } from "@/components/Utils/Universal/Badge";
import { UserNick } from "@/components/Utils/UserNick";
import { SWRConfig, useSWRConfig } from "swr";

export function PostBoxUserPanel({
  avatar,
  role,
  messagesCount,
  reputation,
}: {
  avatar: string;
  role: string;
  messagesCount?: number;
  reputation?: number;
}) {
  let reputationIcon = Meh;
  let reputationColor: BadgeColors = "gray";
  let roleColor: BadgeColors = "gray";

  if (role === "ADMIN") roleColor = "red";

  if (reputation) {
    if (reputation >= 5) {
      reputationColor = "green";
      reputationIcon = ChartNoAxesCombined;
    }

    if (reputation < 0) {
      reputationColor = "red";
      reputationIcon = ShieldAlert;
    }
  }

  return (
    <div
      className="left-panel-post flex flex-col items-center w-32 min-w-32 pr-3"
      style={{
        borderRight: "1px solid #6161614d",
      }}
    >
      <img
        src={`/avatars/${avatar}`}
        className="w-24 rounded-xl"
        alt="user avatar"
      />
      <div className="p-1 mt-3 w-26 flex flex-col gap-2 items-center justify-center">
        <div className="flex flex-row w-full gap-1">
          {messagesCount && (
            <Badge
              color="orange"
              tooltip="User Messages"
              Icon={Send}
              text={`${messagesCount}`}
            />
          )}
          {reputation !== undefined && (
            <Badge
              color={reputationColor}
              Icon={reputationIcon}
              tooltip="User Reputatnion"
              text={`${reputation}`}
            />
          )}
        </div>
        <Badge color={roleColor} Icon={User} text={role} />
      </div>
    </div>
  );
}

function RatingBox({
  ratingSummary,
  postId,
}: {
  ratingSummary: number;
  postId: number;
}) {
  const [rateNumber, setRateNumber] = useState(ratingSummary);

  let className = "";
  if (rateNumber < 0) className += "text-[red]";
  else if (rateNumber === 0) className += "text-[white]";
  else className += "text-[green]";

  async function handleClick(rate: number) {
    let res = await fetchData("/api/forum/rate", {
      postId,
      rate,
    });

    if (res.hasOwnProperty("ratingSummary")) {
      setRateNumber(res.ratingSummary);
    }
  }

  return (
    <div className="flex flex-row  items-center gap-2 pr-8 opacity-50 hover:opacity-100">
      <div
        className="bg-[#31314f] p-1 rounded-xl"
        onClick={async () => {
          await handleClick(1);
        }}
      >
        <Plus size={12} color="white" />
      </div>
      <b className={`select-none ${className}`}>
        {rateNumber > 0 && "+"}
        {rateNumber}
      </b>
      <div
        className="bg-[#31314f] p-1 rounded-xl"
        onClick={async () => {
          await handleClick(-1);
        }}
      >
        <Minus size={12} color="white" />
      </div>
    </div>
  );
}

function PostContentBox({ post }: { post: PostProps }) {
  const { author, createdAt, message, ratingSummary, id } = post;
  const { user } = useUserContext();

  return (
    <div className="right-panel-post w-full ml-6 text-sm relative">
      <UserNick nickname={author.name} role={author.role} />
      <br />
      <span className="text-[#9F9FC9] text-sm">
        Created {formatDateToRelative(createdAt)}
      </span>
      <div className="mt-3">{message}</div>
      <div className="absolute bottom-0 flex flex-row items-center">
        <RatingBox ratingSummary={ratingSummary} postId={id} />
        {user.role === "ADMIN" && <PostTools post={post} />}
      </div>
    </div>
  );
}

export function PostBox({ postData }: { postData: PostProps }) {
  const { author, id } = postData;

  return (
    <div
      className="h-auto w-full bg-[#1e1e2f]/[.5] rounded-xl p-6 flex flex-row mt-4 relative"
      id={`post-${id}`}
    >
      <PostBoxUserPanel
        avatar={author.avatar}
        role={author.role}
        messagesCount={author._count.posts}
        reputation={author.reputation}
      />
      <PostContentBox post={postData} />
      <ReportPostElement postId={id} />
    </div>
  );
}
