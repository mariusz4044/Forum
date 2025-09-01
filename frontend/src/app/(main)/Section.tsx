import { ChevronDown } from "lucide-react";
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

  return (
    <h1 className="text-sm z-20 font-medium tracking-wider">
      {children}
      {user.role === "ADMIN" && (
        <span className="text-[11px] ml-1 opacity-30">#{id}</span>
      )}
    </h1>
  );
}

export function Section({ children }: { children: ReactNode }) {
  return (
    <div
      className="bg-[#1e1e2f]/[.8] p-4 my-4 rounded-lg relative flex flex-row justify-between items-center"
      style={{
        borderTop: "1px solid #32324f",
        background:
          "linear-gradient(90deg, rgb(55 47 179 / 80%), rgb(52 32 99 / 80%))",
      }}
    >
      {children}
    </div>
  );
}
