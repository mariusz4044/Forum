"use client";
import { DialogProvider } from "@/context/DialogContext";
import { UserProvider } from "@/context/UserContext";

import UserLoader from "@/components/UserLoader";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DialogProvider>
      <UserProvider>
        <UserLoader>{children}</UserLoader>
      </UserProvider>
    </DialogProvider>
  );
}
