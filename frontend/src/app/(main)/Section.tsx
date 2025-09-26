import { useUserContext } from "@/context/UserContext";
import { ReactNode } from "react";

export function SectionText({
  children,
  id,
}: {
  children: ReactNode;
  id: number;
}) {
  const { user } = useUserContext();
  const isAdmin = user?.role === "ADMIN";

  return (
    <h1 className="text-sm z-20 font-medium tracking-wider">
      {children}
      {isAdmin && <span className="text-[11px] ml-1 opacity-30">#{id}</span>}
    </h1>
  );
}

export function Section({ children }: { children: ReactNode }) {
  return (
    <div
      className="bg-gradient-to-r from-[rgb(55_47_179/0.8)] to-[rgb(52_32_99/0.8)]
      p-4 my-4 rounded-lg relative flex flex-row justify-between items-center
      border-t-1 border-t-[#32324f]"
    >
      {children}
    </div>
  );
}
