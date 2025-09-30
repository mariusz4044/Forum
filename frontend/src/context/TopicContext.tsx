import { createContext, useContext } from "react";
import { TopicResponse } from "@/types/types";

export const TopicContext = createContext<TopicResponse | null>(null);

export function useTopicContext() {
  const context = useContext(TopicContext);

  if (!context) {
    console.error(context);
    throw new Error("UseTopicContext: invalid context data!");
  }

  return context;
}
