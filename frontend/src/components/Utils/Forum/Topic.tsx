import { MessageCircle, MessageSquarePlus, Rss } from "lucide-react";
import Link from "next/link";

import { LastPost } from "@/app/(main)/page";
import { JSX } from "react";
import { formatDateToRelative } from "@/functions/formatDateToRelative";
import { useUserContext } from "@/context/UserContext";
import { UserNick } from "../UserNick";
import Image from "next/image";

function MessageCountElement({
  messagesCount,
}: {
  messagesCount: number;
}): JSX.Element {
  return (
    <div className="mr-3 flex items-center justify-between max-sm:hidden">
      <div className="bg-[#9f9fc90d] rounded-xl py-1 font-bold text-[14px] text-[gray] flex flex-row items-center justify-center gap-1 w-16">
        <span>{messagesCount}</span>
        <MessageSquarePlus size={13} strokeWidth={3} />
      </div>
    </div>
  );
}

function LastPostElement({ lastPost }: { lastPost: LastPost }): JSX.Element {
  return (
    <div className="flex flex-row w-full h-full items-center gap-3 tracking-wide">
      <Image
        src={`/avatars/${lastPost.author.avatar}`}
        alt="Avatar"
        width={40}
        height={40}
        className="rounded-xl opacity-60"
      />
      <div className="flex flex-col text-sm text-[11px] w-32">
        <div className="font-medium whitespace-nowrap cursor-pointer hover:text-[#9686ff] truncate">
          <Link href={`/topic/${lastPost.topic.id}`}>
            {lastPost.topic.title}
          </Link>
        </div>
        <div className="text-[#9F9FC9] whitespace-nowrap flex flex-col">
          <span>
            Od <UserNick user={lastPost.author} />
          </span>
          {formatDateToRelative(lastPost.createdAt)}
        </div>
      </div>
    </div>
  );
}
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
  categoryId: number;
}) {
  const { user } = useUserContext();

  return (
    <div
      className="bg-[#1a1a2ecc]/[1] p-2 my-4 rounded-lg relative flex flex-row pl-4 h-24  max-sm:h-auto"
      style={{
        border: "1px solid rgba(86, 105, 219, 0.2)",
      }}
    >
      <div className="flex flex-row w-full max-sm:flex-col">
      <div className="flex flex-row w-full">
        {/*topic icon*/}
        <div className="h-full min-w-12 flex items-center justify-between max-sm:py-4">
          <Image
            src={`/${iconPath}`}
            alt="Image Topic"
            width={40}
            height={40}
            placeholder="blur"
            className="opacity-40"
          />
        </div>
        {/*Topic title and desc*/}
        <div className="flex flex-col w-full justify-center ml-2 tracking-wide ">
          <Link href={`/category/${categoryId}`}>
            {title}
            {user.role === "ADMIN" && (
              <span className="text-[11px] ml-1 opacity-30">
                (#{categoryId})
              </span>
            )}
          </Link>
          <div className="text-[11px] text-[#9F9FC9] z-20">{description}</div>
        </div>
      </div>
        {/*Topic last post*/}

        <div className="flex flex-row mr-8 min-w-64 max-w-64 h-full items-center gap-3 tracking-wide max-sm:py-4">
          <MessageCountElement messagesCount={messagesCount} />
          {lastPost?.message && <LastPostElement lastPost={lastPost} />}
        </div>
      </div>
    </div>
  );
}
