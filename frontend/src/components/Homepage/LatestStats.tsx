import { ReactNode } from "react";
import { MessageCircle, Notebook, UserIcon, Users } from "lucide-react";
import { StatsData } from "@/types/types";
import { formatNumber } from "@/components/Utils/formatNumbers";
import { UserNick } from "@/components/Utils/UserNick";
import { formatDateToRelative } from "@/functions/formatDateToRelative";

function StatBox({
  children,
  color,
  borderColor,
}: {
  children: ReactNode;
  color: string;
  borderColor: string;
}) {
  return (
    <div
      className="h-20 flex flex-row border-1 p-4
      rounded-xl bg-opacity-40 items-center gap-2 w-full"
      style={{
        backgroundColor: color,
        border: `1px solid ${borderColor}`,
      }}
    >
      {children}
    </div>
  );
}

function StatTitle({ children }: { children: ReactNode }) {
  return <div className="text-xs text-[#9F9FC9] font-medium">{children}</div>;
}

function StatValue({ children }: { children: ReactNode }) {
  return <div className="text-sm">{children}</div>;
}

export default function ({ stats }: { stats: StatsData }) {
  const { totalUsers, totalTopics, totalPosts, lastUser } = stats;

  return (
    <div className="flex flex-col mt-8 gap-4 w-full justify-between">
      <h1 className="w-full rounded-lg h-12 bg-[#1a1a2ecc] flex items-center text-md pl-4 font-medium">
        Forum stats
      </h1>
      <StatBox color="#38545b33" borderColor="#26697945">
        <Users size={40} className="p-2 bg-[#26697945] rounded-full" />
        <div className="flex flex-col">
          <StatValue>{formatNumber(totalUsers)}</StatValue>
          <StatTitle>Total Users</StatTitle>
        </div>
      </StatBox>
      <StatBox color="#60731333" borderColor="#a8b73245">
        <MessageCircle size={40} className="p-2 bg-[#a8b73245] rounded-full" />
        <div className="flex flex-col">
          <StatValue>{formatNumber(totalPosts)}</StatValue>
          <StatTitle>Total Posts</StatTitle>
        </div>
      </StatBox>
      <StatBox color="#74319d33" borderColor="#ad3cb345">
        <Notebook size={40} className="p-2 bg-[#ad3cb345] rounded-full" />
        <div className="flex flex-col">
          <StatValue>{formatNumber(totalTopics)}</StatValue>
          <StatTitle>Total Topics</StatTitle>
        </div>
      </StatBox>
      <StatBox color="#2f2f2f33" borderColor="#4d4d4d45">
        <UserIcon size={40} className="p-2 bg-[#4d4d4d45] rounded-full" />
        <div className="flex flex-col">
          <StatValue>
            <UserNick user={lastUser} />
          </StatValue>
          <StatTitle>Join {formatDateToRelative(lastUser.createdAt)}</StatTitle>
        </div>
      </StatBox>
    </div>
  );
}
