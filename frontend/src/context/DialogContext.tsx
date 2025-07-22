// context/AuthDialogContext.tsx
import React, { createContext, useContext, useState } from "react";

const DialogContext = createContext({
  open: (mode: "login" | "register") => {},
  close: () => {},
  isOpen: false,
  mode: null as "login" | "register" | null,
});

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register" | null>(null);

  const open = (mode: "login" | "register") => {
    setMode(mode);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setMode(null);
  };

  return (
    <DialogContext.Provider value={{ open, close, isOpen, mode }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => useContext(DialogContext);
