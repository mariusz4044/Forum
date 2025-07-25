"use client";
import { DialogProvider } from "@/context/DialogContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <DialogProvider>{children}</DialogProvider>;
}
