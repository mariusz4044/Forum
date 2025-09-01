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
import { PostAuthor, PostProps } from "@/types/types";
import { useState } from "react";
import Badge, { BadgeColors } from "@/components/Utils/Universal/Badge";
import { UserNick } from "@/components/Utils/UserNick";
import { SWRConfig, useSWRConfig } from "swr";
import { UserAvatar } from "../Utils/UserAvatar";
import { formatShortNumber } from "../Utils/formatNumbers";

export function PostBoxUserPanel({ user }: { user: PostAuthor }) {
  let reputationIcon = Meh;
  let reputationColor: BadgeColors = "gray";
  let roleColor: BadgeColors = "gray";

  if (user.role === "ADMIN") roleColor = "red";

  if (user.reputation) {
    if (user.reputation >= 5) {
      reputationColor = "green";
      reputationIcon = ChartNoAxesCombined;
    }

    if (user.reputation < 0) {
      reputationColor = "red";
      reputationIcon = ShieldAlert;
    }
  }

  return (
    <div
      className="left-panel-post border-r-[1px] border-r-[#6161614d] flex flex-col 
      items-center w-32 min-w-32 pr-3 
      max-sm:min-w-10 max-sm:flex-row max-sm:w-full max-sm:pb-3 max-sm:gap-1
      max-sm:border-r-0 max-sm:border-b-1 max-sm:border-b-[#6161614d]"
    >
      <UserAvatar user={user} className="w-24 rounded-xl max-sm:size-12" />
      <div className="p-1 mt-3 w-[90%] flex flex-col gap-2 justify-center max-sm:mt-0">
        <div className="flex flex-col-reverse w-full gap-1 max-sm:flex-col ">
          {user._count?.posts && (
            <Badge
              color="orange"
              tooltip="User Messages"
              Icon={Send}
              text={`${formatShortNumber(user._count.posts)} posts`}
            />
          )}
          {user.reputation !== undefined && (
            <Badge
              color={reputationColor}
              Icon={reputationIcon}
              tooltip="User Reputatnion"
              text={`${user.reputation} prestige`}
            />
          )}
        </div>
        {/*<Badge color={roleColor} Icon={User} text={role} />*/}
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
  const { user } = useUserContext();

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

  if (!user.id) {
    return (
      <div className="flex flex-row justify-center items-center gap-2 pr-8 opacity-50 hover:opacity-100">
        Rep:
        <b className={`select-none mt-0.5 ${className}`}>
          {rateNumber > 0 && "+"}
          {rateNumber}
        </b>
      </div>
    );
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
      Rep:
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

function EditedBox({ message }: { message: string }) {
  return <div className="text-[11px] mt-7 text-gray-400">{message}</div>;
}

function PostContentBox({ post }: { post: PostProps }) {
  const { author, createdAt, message, ratingSummary, id, editedMessage } = post;
  const { user } = useUserContext();

  return (
    <div className="right-panel-post w-full ml-6 relative max-sm:ml-0 max-sm:mt-4">
      <UserNick user={author} />
      <br />
      <span className="text-[#9F9FC9] text-sm max-sm:text-[12px]">
        Created {formatDateToRelative(createdAt)}
      </span>
      <div className="mt-3 wrap-anywhere mb-10 whitespace-pre-line">
        {message}
        {editedMessage && <EditedBox message={editedMessage} />}
      </div>
      <div className="absolute bottom-0 flex flex-row items-center max-sm:border-t-1 max-sm:border-t-[#6161614d] max-sm:w-full max-sm:pt-2">
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
      className="h-auto w-full bg-[#1a1a2ecc]/[0.7] rounded-xl p-6 flex flex-row mt-4 relative max-sm:flex-col"
      id={`post-${id}`}
      style={{
        border: "1px solid rgba(86, 105, 219, 0.2)",
      }}
    >
      <PostBoxUserPanel user={author} />
      <PostContentBox post={postData} />
      <ReportPostElement postId={id} />
    </div >
  );
}
