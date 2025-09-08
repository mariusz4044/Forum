import { useDialogContext } from "@/context/DialogContext";
import { User } from "@/context/UserContext";
import { fetchData } from "@/functions/fetchData";

export function UserNick({ user }: { user: User }) {
  const { open, setDialogData } = useDialogContext();

  let className = `capitalize cursor-pointer hover:text-blue-500 select-none`;
  if (user.role) className += ` ${user.role}`;

  async function getUserData() {
    const userData = await fetchData(
      `/api/user/profile/${user.id}`,
      null,
      "GET",
    );
    setDialogData(userData);
    open("userProfile");
  }

  return (
    <span className={className} onClick={getUserData}>
      {user.name}
    </span>
  );
}
