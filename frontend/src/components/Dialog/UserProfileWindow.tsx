import Window from "@/components/Utils/Universal/Window";
import { useDialogContext } from "@/context/DialogContext";
import { User, useUserContext } from "@/context/UserContext";
import { formatDateToRelative } from "@/functions/formatDateToRelative";
import { UserNick } from "../Utils/UserNick";

function BadgeProfile({ text }: { text: string }) {
  return (
    <div
      className="px-4 py-1 rounded-full text-sm tracking-wider  mt-2"
      style={{
        background: "linear-gradient(45deg, #5669db, #667eea)",
        boxShadow: "0 4px 12px rgba(86, 105, 219, 0.3)",
      }}
    >
      <span className="uppercase">{text}</span>
    </div>
  );
}

export default function UserProfileWindow() {
  const { close, data } = useDialogContext();
  const user: User & { posts: number; createdAt: string } = data!;

  return (
    <Window>
      <div className="flex flex-col">
        <header className="pt-6 flex flex-col items-center border-b-1 border-[#5669db1a] pb-8">
          <img src={`/avatars/${user.avatar}`} className="w-24 rounded-xl" />
          <span className="text-xl tracking-wider mt-4">
            <UserNick user={user} />
          </span>
          <BadgeProfile text={user.role} />
        </header>
        <main className="flex items-center flex-row gap-2 mt-6">
          <div className="flex flex-col p-4 bg-[#5669db1a] border-1 border-[#5669db33] rounded-xl w-full items-center">
            <span>💬</span>
            <span>{user.posts}</span>
            <span className="uppercase text-sm text-white/[0.5]">Messages</span>
          </div>
          <div className="flex flex-col scroll-p-1 p-4 bg-[#5669db1a] border-1 border-[#5669db33] rounded-xl w-full items-center">
            <span>⭐</span>
            <span>{user.reputation}</span>
            <span className="uppercase text-sm text-white/[0.5]">
              Reputation
            </span>
          </div>
        </main>
        <footer>
          <div className="p-4 bg-[#ffffff0d] mt-4 justify-center items-center flex flex-col  rounded-xl border-l-3 border-l-[#5669db66]">
            <span className="text-sm uppercase text-white/[0.5] ">Joined</span>
            <span className="text-sm mt-1 capitalize">
              {formatDateToRelative(user.createdAt)}
            </span>
          </div>
        </footer>
      </div>
    </Window>
  );
}
