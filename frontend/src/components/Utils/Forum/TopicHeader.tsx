import { ChevronDown } from "lucide-react";

export default function TopicHeader({ title }: { title: string }) {
  return (
    <div
      className="bg-[#1e1e2f]/[.8] p-4 my-4 rounded-lg relative flex flex-row justify-between items-center"
      style={{
        borderTop: "1px solid #32324f",
      }}
    >
      <h1 className="text-sm z-20 font-bold">{title}</h1>
      <div className="bg-[#282847] p-1 rounded-md cursor-pointer">
        <ChevronDown size={13} strokeWidth={3} />
      </div>
    </div>
  );
}
