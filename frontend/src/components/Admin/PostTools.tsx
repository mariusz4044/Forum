import { Ban, Delete, Edit, Trash } from "lucide-react";
import { ComponentType } from "react";

function AdminTool({
  title,
  Icon,
}: {
  title: string;
  Icon: ComponentType<{ size?: number }>;
}) {
  return (
    <div className="flex flex-row items-center gap-1 bg-[#31314f] px-2 py-1 rounded-lg select-none opacity-30 hover:opacity-100">
      <Icon size={13}></Icon>
      <span className="text-[12px]">{title}</span>
    </div>
  );
}

export function PostTools() {
  return (
    <div className="flex flex-row gap-1 ">
      <AdminTool title="Delete" Icon={Trash} key="admin-delete" />
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
