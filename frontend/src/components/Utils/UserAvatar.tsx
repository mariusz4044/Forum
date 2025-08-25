import { User } from "@/context/UserContext";
import Image from "next/image";

export function UserAvatar({user, className}: {user: User, className: string}) {
    return <Image src={`/avatars/${user.avatar}`} width={96} height={96} alt="User avatar" className={className} />
}