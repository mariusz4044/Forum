import { fetchData } from "@/functions/fetchData";
import ForumButton from "../Utils/Buttons/ForumButton";
import { getSWRKey } from "../Utils/getSWRKey";
import { useSWRConfig } from "swr";
import { X, Edit } from "lucide-react";

export function DelteTopicButton({ topicId }: { topicId: number }) {
  async function deleteTopic() {
    await fetchData(
      `/api/topic`,
      {
        topicId: +topicId,
      },
      "DELETE",
    );
  }

  return (
    <ForumButton onClick={deleteTopic}className="w-36">
      <div className="flex flex-row gap-2 items-center">
        <X size={12} />
        <span>Delete topic</span>
      </div>
    </ForumButton>
  );
}

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
    <ForumButton onClick={editTopicStatus} className="w-34">
      <div className="flex flex-row gap-2 items-center">
        <Edit size={12} />
        {isOpen ? "Close topic" : "Open Topic"}
      </div>
    </ForumButton>
  );
}
