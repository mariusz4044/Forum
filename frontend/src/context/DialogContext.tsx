import React, { createContext, useContext, useState } from "react";

type Mode =
  | "login"
  | "register"
  | "topic"
  | "editPost"
  | "banUser"
  | "userProfile"
  | "none";

const DialogContext = createContext({
  open: (mode: Mode) => {},
  close: () => {},
  isOpen: false,
  setDialogData: (data: any) => {},
  data: null,
  mode: "none",
});

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const [mode, setMode] = useState<Mode>("none");

  const open = (mode: Mode) => {
    setMode(mode);
    setIsOpen(true);
  };

  const setDialogData = (data: any) => {
    setData(data);
  };

  const close = () => {
    setIsOpen(false);
    setMode("none");
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
