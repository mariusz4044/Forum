import { User } from "@/context/UserContext";

export function UserAvatar({user, className}: {user: User, className: string}) {
    return <img src={`/avatars/${user.avatar}`} alt="User avatar" className={className} />
}