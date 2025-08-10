import { createContext, useContext } from "react";
import { PostProps } from "@/types/types";

export const PostContext = createContext<PostProps | null>(null);

export function usePostContext() {
  const context = useContext(PostContext);

  if (!context) {
    console.error(`Context not found`, context);
    throw new Error("PostContext: invalid context data!");
  }

  return context;
}
