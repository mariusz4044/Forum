"use client";

import { clsx } from "clsx";
import { ReactNode } from "react";

export default function ForumButton({
  children,
  type,
  className = "",
  onClick,
}: {
  children: ReactNode;
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
        "bg-blue-500/[0.2] inset-ring-1 inset-ring-blue-500/50 rounded-lg cursor-pointer",
        "flex items-center justify-center gap-2 flex-row-reverse",
        "w-32 h-8",
        className,
      )}
    >
      {children}
    </button>
  );
}
