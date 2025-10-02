import { formatDateToRelative } from "@/functions/formatDateToRelative";
import { useUserContext } from "@/context/UserContext";
import { UserNick } from "@/components/Utils/UserNick";
import { formatShortNumber } from "@/components/Utils/formatNumbers";
import { Category, LastPost } from "@/types/types";
import { UserAvatar } from "@/components/Utils/UserAvatar";

import { MessageCircle, MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";
import Image from "next/image";
import { TopicProps } from "../category/[categoryId]/page";

function MessageCountElement({
  messagesCount,
}: {
  messagesCount: number;
}): JSX.Element {
  return (
    <div className="mr-3 flex items-center justify-between max-sm:hidden">
      <div
        className="py-1 text-[14px] text-[#94a3b8]/60 bg-[#1d1d35] hover:scale-95
        inset-shadow-xs inset-shadow-gray-700/50 rounded-xl
        flex flex-row items-center justify-center gap-1 w-20"
      >
        <span>{formatShortNumber(messagesCount)}</span>
        <MessageCircle size={13} strokeWidth={2} />
      </div>
    </div>
  );
}

function LastPostElement({ lastPost }: { lastPost: LastPost }) {
  const { topic, author, createdAt } = lastPost;
  return (
    <div className="flex flex-row w-full h-full items-center gap-3 tracking-wide">
      <UserAvatar
        user={author}
        className="rounded-xl opacity-60"
        size={{ width: 42, height: 42 }}
      />
      <div className="flex flex-col text-sm text-[11px] w-32">
        <div className="whitespace-nowrap cursor-pointer truncate text-sm">
          <Link href={`/topic/${topic.id}`}>{topic.title}</Link>
        </div>
        <div className="text-[#9F9FC9] whitespace-nowrap flex flex-col">
          <span>
            from <UserNick user={author} />
          </span>
          {formatDateToRelative(createdAt)}
        </div>
      </div>
    </div>
  );
}

const TopicIcon = ({ image }: { image: string }) => (
  <div className="flex-shrink-0 flex items-center justify-center">
    <Image
      src={`/TopicIcons/${image}`}
      alt="Topic Icon"
      width={40}
      height={40}
      className="opacity-40"
    />
  </div>
);

const TopicDetails = ({
  id,
  title,
  description,
  isAdmin,
}: {
  id: number;
  title: string;
  description: string;
  isAdmin: boolean;
}) => (
  <div className="flex-grow flex flex-col justify-center gap-0.5">
    <Link href={`/category/${id}`} className="text-base font-medium truncate">
      <span className="text-sm">{title}</span>
      {isAdmin && <span className="text-xs ml-1 opacity-30">(#{id})</span>}
    </Link>
    <p className="text-xs text-[#9F9FC9] truncate">{description}</p>
  </div>
);

const TopicStats = ({
  topicsCount,
  lastPost,
}: {
  topicsCount: number;
  lastPost: LastPost | null;
}) => (
  <div className="flex items-center gap-4 w-full sm:w-auto min-w-[300px] py-2 sm:py-0">
    <MessageCountElement messagesCount={topicsCount} />
    {lastPost && <LastPostElement lastPost={lastPost} />}
  </div>
);

export default function Topic({ category }: { category: Category }) {
  const { id, title, description, image, topicsCount, lastPost } = category;
  const { user } = useUserContext();

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="my-4  min-h-24 flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg bg-[#1a1a2e]/[0.4] border border-[rgba(86,105,219,0.2)]">
      <div className="flex items-center w-full flex-grow gap-3.5">
        <TopicIcon image={image} />
        <TopicDetails
          id={id}
          title={title}
          description={description}
          isAdmin={isAdmin}
        />
      </div>
      <TopicStats topicsCount={topicsCount} lastPost={lastPost} />
    </div>
  );
}
