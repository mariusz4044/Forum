import { Flag } from "lucide-react";

export function ReportPostElement({ postId }: { postId: number }) {
  return (
    <div className="flex flex-row gap-1 items-center absolute bottom-6 right-10 opacity-30 hover:opacity-100 cursor-pointer">
      <Flag size={12} color="#9F9FC9"></Flag>
      <b className="text-sm text-[#9F9FC9] uppercase ">report (#{postId})</b>
    </div>
  );
}
