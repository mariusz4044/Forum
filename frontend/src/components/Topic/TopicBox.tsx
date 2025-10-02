import { TopicProps } from "@/app/category/[categoryId]/page";
import { formatDateToRelative } from "@/functions/formatDateToRelative";
import Link from "next/link";
import { UserNick } from "../Utils/UserNick";
import Image from "next/image";
import { formatShortNumber } from "@/components/Utils/formatNumbers";
import { MessageCircle } from "lucide-react";
import { UserAvatar } from "@/components/Utils/UserAvatar";

function TopicClosed() {
  return (
    <span className="px-2 rounded-full text-sm bg-[#ff47571a] text-[#f72c3e] border-1 border-[#ff47574d] text-[10px] lowercase">
      closed
    </span>
  );
}

export function TopicBox({ topic }: { topic: TopicProps }) {
  const { createdBy, postsCount, id, createdAt, title, isOpen } = topic;

  return (
    <div
      className="bg-[#1e1e2f]/[.2] rounded-xs px-6 h-25 relative flex flex-row justify-between items-center max-sm:px-2"
      style={{
        borderBottom: "1px solid #a3a3a325",
      }}
    >
      <div className="left-topic flex flex-row gap-4 items-center">
        <div className="size-12 relative">
          <UserAvatar user={createdBy} className="rounded-xl opacity-50" />
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <Link
            href={`/topic/${id}`}
            className="capitalize flex flex-row gap-2 items-center"
          >
            {title} {!isOpen && <TopicClosed />}
          </Link>
          <span className="text-[12px] text-[#9F9FC9]">
            From <UserNick user={createdBy} />
            <span className="max-sm:hidden">
              , {formatDateToRelative(createdAt)}
            </span>
          </span>
        </div>
      </div>
      <div
        className=" text-[#94a3b8]/60 bg-[#1e1e2f]/50 hover:scale-95
      inset-shadow-xs inset-shadow-gray-700/50 rounded-xl
      py-1 font-medium text-[14px] flex flex-row items-center justify-center gap-2 min-w-24 mr-12 select-none"
      >
        <span>{formatShortNumber(postsCount)} posts</span>
        <MessageCircle size={12} />
      </div>
    </div>
  );
}
