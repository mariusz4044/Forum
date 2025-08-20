"use client";

import { motion } from "framer-motion";

import { ReactNode } from "react";
import { X } from "lucide-react";

import { useDialogContext } from "@/context/DialogContext";

interface WindowProps {
  title?: string;
  children?: ReactNode;
}

export default function Window({ children, title }: WindowProps) {
  const { close } = useDialogContext();

  return (
    <div>
      <motion.div
        className="fixed w-screen h-screen bg-black/70 left-0 top-0 z-30 "
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
        max-sm:mx-4 max-sm:w-[90%] max-sm:left-[46%]
    fixed top-2/4 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-sm h-auto bg-[#1a1a2ee6] z-30 rounded-lg p-5 px-8 pb-8"
      >
        <header className="flex flex-col justify-between items-center relative">
          {title && (
            <div className="w-full flex flex-col items-center">
              <h2 className="text-xl font-medium">{title}</h2>{" "}
              <div className="separator"></div>
            </div>
          )}
        </header>
        <main>{children}</main>
      </motion.div>
    </div>
  );
}
