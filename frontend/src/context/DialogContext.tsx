import React, { createContext, useContext, useState } from "react";

const DialogContext = createContext({
  open: (mode: "login" | "register" | "topic" | "editPost") => {},
  close: () => {},
  isOpen: false,
  setDialogData: (data: any) => {},
  data: null,
  mode: null as "login" | "register" | "topic" | "editPost" | null,
});

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const [mode, setMode] = useState<
    "login" | "register" | "topic" | "editPost" | null
  >(null);

  const open = (mode: "login" | "register" | "topic" | "editPost") => {
    setMode(mode);
    setIsOpen(true);
  };

  const setDialogData = (data: any) => {
    setData(data);
  };

  const close = () => {
    setIsOpen(false);
    setMode(null);
  };

  return (
    <DialogContext.Provider
      value={{ open, close, isOpen, mode, setDialogData, data }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => useContext(DialogContext);
