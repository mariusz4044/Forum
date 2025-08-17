import { fetchData } from "@/functions/fetchData";
import ForumButton from "../Utils/Buttons/ForumButton";
import { getSWRKey } from "../Utils/getSWRKey";
import { useSWRConfig } from "swr";

export function CloseTopicButton({
  topicId,
  isOpen,
}: {
  topicId: number;
  isOpen: boolean;
}) {
  const { mutate, cache } = useSWRConfig();

  async function editTopicStatus() {
    await fetchData(`/api/topic/editTopicStatus`, {
      topicId: +topicId,
      status: !isOpen,
    });

    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean).join("/");
    const SWRString = getSWRKey(cache, segments);
    await mutate(SWRString);
  }

  return (
    <ForumButton
      onClick={() => {
        editTopicStatus();
      }}
    >
      {isOpen ? "Close topic" : "Open Topic"}
    </ForumButton>
  );
}
