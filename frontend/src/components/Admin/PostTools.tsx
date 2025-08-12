import { Ban, Delete, Edit, Trash } from "lucide-react";
import { ComponentType } from "react";
import { UserNick } from "../Utils/UserNick";
import { fetchData } from "@/functions/fetchData";
import { useSWRConfig } from "swr";
import { getSWRKey } from "../Utils/getSWRKey";

function AdminTool({
  title,
  Icon,
  clickEvent,
}: {
  title: string;
  Icon: ComponentType<{ size?: number }>;
  clickEvent?: () => void;
}) {
  return (
    <div
      className="flex flex-row items-center gap-1 bg-[#31314f] px-2 py-1 rounded-lg select-none opacity-30 hover:opacity-100"
      onClick={clickEvent}
    >
      <Icon size={13}></Icon>
      <span className="text-[12px]">{title}</span>
    </div>
  );
}

function deletePost({ postId }: { postId: number }) {
  return fetchData(
    "/api/post/delete",
    {
      postId: postId,
    },
    "DELETE",
  );
}

export function PostTools({ postId }: { postId: number }) {
  const { cache, mutate } = useSWRConfig();

  function reloadSwrFetch() {
    const SWRString = getSWRKey(cache, "/forum/topic");
    mutate(SWRString);
  }

  return (
    <div className="flex flex-row gap-1 ">
      <AdminTool
        title="Delete"
        Icon={Trash}
        key="admin-delete"
        clickEvent={() => {
          deletePost({ postId }).then(reloadSwrFetch);
        }}
      />
      <AdminTool title="Edit" Icon={Edit} key="admin-edit" />
      <AdminTool title="Ban user" Icon={Ban} key="admin-ban" />
      <AdminTool
        title="Delete all posts"
        Icon={Delete}
        key="admin-remove-all"
      />
    </div>
  );
}
