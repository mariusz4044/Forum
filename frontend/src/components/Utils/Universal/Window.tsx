"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { X } from "lucide-react";

interface WindowProps {
  title: string;
  children?: ReactNode;
}

export default function Window({ children, title }: WindowProps) {
  return (
    <motion.div
      className="fixed w-screen h-screen bg-black/80 left-0 top-0 z-30"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      <motion.div
        role="dialog"
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="
    fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
    w-sm h-auto bg-[#23233a] z-30 rounded-lg p-5"
      >
        <header className="flex flex-row justify-between items-center">
          <h2 className="text-2xl font-medium">{title}</h2>
          <X size={25} />
        </header>
        <div className="separator"></div>
        <main>{children}</main>
      </motion.div>
    </motion.div>
  );
}
