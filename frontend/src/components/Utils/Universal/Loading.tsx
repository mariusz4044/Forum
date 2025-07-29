import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <motion.div
      className="fixed flex w-screen h-screen left-0 top-0 bg-[#1c1c2d] z-50 items-center justify-center flex-col"
      exit={{ opacity: 0 }}
    >
      <h1 className="mb-10 font-bold text-3xl">Loading...</h1>
      <LoaderCircle className="opacity-60 spinner" size={40} />
    </motion.div>
  );
}
