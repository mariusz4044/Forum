import { useDialogContext } from "@/context/DialogContext";
import { User } from "@/context/UserContext";
import { fetchData } from "@/functions/fetchData";

export function UserNick({ user }: { user: User }) {
  const { open, setDialogData } = useDialogContext();

  let className = `capitalize cursor-pointer hover:text-blue-500`;
  if (user.role) className += ` ${user.role}`;

  async function getUserData() {
    const res = await fetchData(`/api/user/profile/${user.id}`, null, "GET");
    const userData = res;

    setDialogData(userData);
    open("userProfile");
  }

  return (
    <span className={className} onClick={getUserData}>
      {user.name}
    </span>
  );
}
