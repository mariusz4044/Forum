import React, { createContext, useContext, useState } from "react";

const DialogContext = createContext({
  open: (mode: "login" | "register" | "topic") => {},
  close: () => {},
  isOpen: false,
  mode: null as "login" | "register" | "topic" | null,
});

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "register" | "topic" | null>(null);

  const open = (mode: "login" | "register" | "topic") => {
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
