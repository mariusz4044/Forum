import { createContext, useContext } from "react";
import { TopicResponseData } from "@/types/types";

export const TopicContext = createContext<TopicResponseData | null>(null);

export function useTopicContext() {
  const context = useContext(TopicContext);

  if (!context) {
    console.error(context);
    throw new Error("UseTopicContext: invalid context data!");
  }

  return context;
}
