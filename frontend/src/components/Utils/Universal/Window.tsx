import { ReactNode } from "react";

interface WindowProps {
  title: string;
  children?: ReactNode;
}

export default function Window({ children, title }: WindowProps) {
  return (
    <div
      role="dialog"
      className="
    fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-sm h-auto bg-[#23233a] z-30 rounded-lg p-5"
    >
      <h1>{title}</h1>
      {children}
    </div>
  );
}
