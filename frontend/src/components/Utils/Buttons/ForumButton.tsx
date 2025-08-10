"use client";

import { clsx } from "clsx";

export default function ForumButton({
  children,
  type,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx(
        "text-[12px] uppercase font-bold p-2 tracking-[1.2px] text-[#e7e4ff]",
        "bg-[#31314f] rounded-lg cursor-pointer",
        "flex items-center justify-center gap-2 flex-row-reverse",
        "w-32 h-8",
        className,
      )}
    >
      {children}
    </button>
  );
}
