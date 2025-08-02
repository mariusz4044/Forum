import { Rss } from "lucide-react";
import Link from "next/link";

type LastPost = {
  userName: string;
  date: string;
  avatar: string;
  topicName: string;
};

export default function Topic({
  title,
  description,
  iconPath,
  messagesCount,
  lastPost,
  categoryId,
}: {
  title: string;
  description: string;
  messagesCount: number;
  iconPath: string;
  lastPost: LastPost;
  categoryId: string;
}) {
  return (
    <div
      className="bg-[#1e1e2f]/[.5] p-4 my-4 rounded-lg relative flex flex-row pl-4 h-24"
      style={{
        border: "1px solid #3a3a5f4a",
      }}
    >
      <div className="flex flex-row w-full">
        {/*topic icon*/}
        <div className="h-full flex items-center justify-between">
          <img
            src={iconPath}
            alt="Image Topic"
            className="w-12 h-10 opacity-40"
          />
        </div>
        {/*Topic title and desc*/}
        <div className="flex flex-col w-full justify-center ml-4 tracking-wide">
          <Link href={`/category/${categoryId}`}>
            <div className="text-sm z-20 font-medium cursor-pointer hover:text-[#9686ff]">
              {title}
            </div>
          </Link>
          <div className="text-[11px] text-[#9F9FC9] z-20">{description}</div>
        </div>
        {/*Topic last post*/}
        <div className="flex flex-row mr-8 w-96 h-full items-center gap-3 tracking-wide">
          <div className="mr-3 flex items-center justify-between">
            <div className="bg-[#9f9fc90d] rounded-xl py-1 font-bold text-[14px] text-[#fff] flex flex-row items-center justify-center gap-1 w-16">
              <span>{messagesCount}</span>
              <Rss size={14} strokeWidth={3} />
            </div>
          </div>
          <img
            src={lastPost.avatar}
            alt="Avatar"
            className="rounded-xl w-10 h-10 opacity-60"
          />
          <div className="flex flex-col text-sm text-[11px] w-32">
            <div className="font-medium whitespace-nowrap cursor-pointer hover:text-[#9686ff]">
              {lastPost.topicName}
            </div>
            <div className="text-[#9F9FC9] whitespace-nowrap">
              Od <span>{lastPost.userName}</span>, {lastPost.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
