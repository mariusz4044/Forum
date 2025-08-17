import { formatDateToRelative } from "@/functions/formatDateToRelative";
import { useTopicContext } from "@/context/TopicContext";
import { UserNick } from "@/components/Utils/UserNick";
import { useUserContext } from "@/context/UserContext";
import { CloseTopicButton } from "../Admin/TopicTools";

export function TopicHeader() {
  const { title, createdBy, createdAt, id, isOpen } = useTopicContext();
  console.log(id);
  const { user } = useUserContext();

  return (
    <div
      className="h-auto w-full bg-[#1e1e2f]/[.5] rounded-xl p-6"
      style={{ border: "1px solid rgba(58, 58, 95, 0.29)" }}
    >
      <div className="flex justify-between">
        <h1 className="text-xl ml-2 capitalize">{title}</h1>
        <div>
          {user.role === "ADMIN" && (
            <CloseTopicButton topicId={id} isOpen={isOpen} />
          )}
        </div>
      </div>
      <div className="bg-[#6161614d] mt-4 h-[1px]"></div>
      <div className="flex flex-row items-center mt-4">
        <img
          src={`/avatars/${createdBy.avatar}`}
          alt="user avatar"
          className="size-12 opacity-70 rounded-full ml-1"
        />
        <div className="flex flex-col text-sm justify-center ml-2">
          <span>
            From <UserNick user={createdBy} />
          </span>
          <span className="text-[#9F9FC9] text-sm">
            created {formatDateToRelative(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
