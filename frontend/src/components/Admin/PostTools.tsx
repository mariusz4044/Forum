import { Ban, Delete, Edit, Trash } from "lucide-react";
import { ComponentType } from "react";
import { fetchData } from "@/functions/fetchData";
import { useDialogContext } from "@/context/DialogContext";
import { PostProps } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { mutate } from "swr";

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

function deleteAllPosts({ userId }: { userId: number }) {
  return fetchData(
    "/api/posts/delete",
    {
      userId,
    },
    "DELETE",
  );
}

export function PostTools({ post }: { post: PostProps & { topicId: number } }) {
  const { open, setDialogData } = useDialogContext();

  // routing data
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || `1`;

  const reloadPosts = () => {
    mutate([`topic/${post.topicId}`, parseInt(page as string)]);
  };

  return (
    <div className="flex flex-row gap-1 ">
      <AdminTool
        title="Delete"
        Icon={Trash}
        key="admin-delete"
        clickEvent={() => {
          deletePost({ postId: post.id }).then(reloadPosts);
        }}
      />
      <AdminTool
        title="Edit"
        Icon={Edit}
        key="admin-edit"
        clickEvent={() => {
          setDialogData(post);
          open("editPost");
        }}
      />
      <AdminTool
        title="Ban user"
        Icon={Ban}
        key="admin-ban"
        clickEvent={() => {
          setDialogData(post);
          open("banUser");
        }}
      />
      <AdminTool
        title="Delete all posts"
        Icon={Delete}
        key="admin-remove-all"
        clickEvent={() => {
          deleteAllPosts({ userId: post.author.id! }).then(reloadPosts);
        }}
      />
    </div>
  );
}
