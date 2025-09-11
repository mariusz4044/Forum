import { User } from "@/context/UserContext";
import Image from "next/image";

export function UserAvatar({
  user,
  className,
  size,
}: {
  user: User;
  className?: string;
  size?: { width: number; height: number };
}) {
  return (
    <Image
      src={`${process.env.SERVER_URL}/image/avatar/${user.avatar}`}
      width={size?.width || 96}
      height={size?.height || 96}
      alt="User avatar"
      className={className}
    />
  );
}
