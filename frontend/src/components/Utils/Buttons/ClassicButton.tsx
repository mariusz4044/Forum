"use client";

import { clsx } from "clsx";

export default function ClassicButton({
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
        "text-[12px] uppercase font-bold p-3 tracking-[1.2px]",
        "bg-black/[.5] rounded-lg cursor-pointer",
        "flex items-center justify-center gap-2 flex-row-reverse",
        "w-32 h-10",
        className,
      )}
    >
      {children}
    </button>
  );
}
