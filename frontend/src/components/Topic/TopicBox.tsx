import { TopicProps } from "@/app/category/[categoryId]/page";
import { formatDateToRelative } from "@/functions/formatDateToRelative";
import Link from "next/link";
import { UserNick } from "../Utils/UserNick";
import { User } from "@/context/UserContext";
import Image from "next/image"

function TopicClosed() {
  return (
    <span className="px-2 rounded-full text-sm bg-[#ff47571a] text-[#f72c3e] border-1 border-[#ff47574d] text-[10px] lowercase">
      closed
    </span>
  );
}

export function TopicBox({ user, topic }: { user: User; topic: TopicProps }) {
  return (
    <div
      className="bg-[#1e1e2f]/[.2] rounded-xs px-6 h-25 relative flex flex-row justify-between items-center"
      style={{
        borderBottom: "1px solid #a3a3a325",
      }}
    >
      <div className="left-topic flex flex-row gap-4">
        <Image
          src={`/avatars/${user.avatar}`}
          alt="user avatar"
          width={48}
          height={48}
          className="rounded-xl opacity-50"
        />
        <div className="flex flex-col gap-1 text-lg">
          <Link
            href={`/topic/${topic.id}`}
            className="capitalize flex flex-row gap-2 items-center"
          >
            {topic.title} {!topic.isOpen && <TopicClosed />}
          </Link>
          <span className="text-[12px] text-[#9F9FC9]">
            Przez <UserNick user={user} />,{" "}
            {formatDateToRelative(topic.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
