import { Send, User } from "lucide-react";
import { PostProps } from "@/app/topic/[topicId]/page";
import { formatDateToRelative } from "@/functions/formatDateToRelative";

export function PostBox({ postData }: { postData: PostProps }) {
  return (
    <div className="h-auto w-full bg-[#1e1e2f]/[.5] rounded-xl p-6 flex flex-row mt-4">
      <div className="left-panel-post flex flex-col items-center w-32">
        <img
          src={`/avatars/${postData.author.avatar}`}
          className="w-24 rounded-xl"
          alt="user avatar"
        />
        <div className="font-bold flex flex-row items-center gap-1 bg-[#164529]/[0.5] text-[#4bcc5c] rounded p-1 mt-3 w-24">
          <Send size={12} />
          <span className="text-[10px]">2 messages</span>
        </div>
        <div className="font-bold flex flex-row items-center gap-1 bg-[#6f6f6f]/[0.5] text-[#bbbbbb] rounded p-1 mt-3 w-24">
          <User size={12} />
          <span className="text-[10px]">{postData.author.role}</span>
        </div>
      </div>
      <div
        className="right-panel-post ml-6 pl-6 text-sm"
        style={{
          borderLeft: "1px solid #6161614d",
        }}
      >
        <h1 className="font-bold">{postData.author.name}!</h1>
        <span className="text-[#9F9FC9] text-[12px]">
          created {formatDateToRelative(postData.createdAt)}
        </span>
        <div className="mt-3">{postData.message}</div>
      </div>
    </div>
  );
}
