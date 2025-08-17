import { TopicProps } from "@/app/category/[categoryId]/page";
import { formatDateToRelative } from "@/functions/formatDateToRelative";
import Link from "next/link";
import { UserNick } from "../Utils/UserNick";
import { User } from "@/context/UserContext";

export function TopicBox({ user, topic }: { user: User; topic: TopicProps }) {
  return (
    <div
      className="bg-[#1e1e2f]/[.2] rounded-xs px-6 h-20 relative flex flex-row justify-between items-center"
      style={{
        borderBottom: "1px solid #a3a3a325",
      }}
    >
      <div className="left-topic flex flex-row gap-4">
        <img
          src={`/avatars/${user.avatar}`}
          alt="user avatar"
          className="rounded-xl size-10 opacity-50"
        />
        <div className="flex flex-col gap-1 text-md">
          <Link href={`/topic/${topic.id}`} className="capitalize">
            {topic.title}
          </Link>
          <span className="text-[11px] text-[#9F9FC9]">
            Przez <UserNick user={user} />,{" "}
            {formatDateToRelative(topic.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
