import { ReactNode } from "react";

export function SettingsSubHeaderText({ children }: { children: ReactNode }) {
  return <p className="text-sm text-[#aaa]">{children}</p>;
}

export function SettingsHeaderText({ children }: { children: ReactNode }) {
  return <h2 className="font-bold text-lg">{children}</h2>;
}

export function SettingsHeader({ children }: { children: ReactNode }) {
  return (
    <div
      className="p-5 border-b-1 border-b-[#ffffff1a]"
      style={{
        background:
          "linear-gradient(135deg, rgba(124, 127, 198, 0.1) 0%, rgba(255, 119, 198, 0.1) 100%)",
      }}
    >
      {children}
    </div>
  );
}

export function SettingsContent({ children }: { children: ReactNode }) {
  return <div className="p-5">{children}</div>;
}

export function SettingsBox({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#ffffff05] border-1 border-[#ffffff1a] rounded-xl h-auto">
      {children}
    </div>
  );
}
