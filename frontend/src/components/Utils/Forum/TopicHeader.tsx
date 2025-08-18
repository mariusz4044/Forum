import { ChevronDown } from "lucide-react";
import { useUserContext } from "@/context/UserContext";

export default function TopicHeader({
  title,
  id,
}: {
  title: string;
  id: number;
}) {
  const { user } = useUserContext();

  return (
    <div
      className="bg-[#1e1e2f]/[.8] p-4 my-4 rounded-lg relative flex flex-row justify-between items-center"
      style={{
        borderTop: "1px solid #32324f",
      }}
    >
      <h1 className="text-sm z-20 font-medium tracking-wider">
        {title}
        {user.role === "ADMIN" && (
          <span className="text-[11px] ml-1 opacity-30">(#{id})</span>
        )}
      </h1>
      <div className="bg-[#282847] p-1 rounded-md cursor-pointer">
        <ChevronDown size={13} strokeWidth={3} />
      </div>
    </div>
  );
}
