"use client";

import { motion } from "framer-motion";

import { ReactNode } from "react";
import { X } from "lucide-react";

import { useDialogContext } from "@/context/DialogContext";

interface WindowProps {
  title: string;
  children?: ReactNode;
}

export default function Window({ children, title }: WindowProps) {
  const { close } = useDialogContext();

  return (
    <div>
      <motion.div
        className="fixed w-screen h-screen bg-black/80 left-0 top-0 z-30"
        id="dialog-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={close}
      ></motion.div>
      <motion.div
        role="dialog"
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        exit={{ opacity: 0, y: -30 }}
        className="
    fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-sm h-auto bg-[#23233a] z-30 rounded-lg p-5"
      >
        <header className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-medium">{title}</h2>
          <X
            size={25}
            className="font-semibold text-gray-500 cursor-pointer"
            onClick={close}
          />
        </header>
        <div className="separator"></div>
        <main>{children}</main>
      </motion.div>
    </div>
  );
}
