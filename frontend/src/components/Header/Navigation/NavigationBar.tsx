"use client";

import LoginButton from "@/components/Utils/Buttons/LoginButton";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import { useContext } from "react";
import { useDialogContext } from "@/context/DialogContext";
import { User, useUserContext } from "@/context/UserContext";

function UserPanel({ user }: { user: User }) {
  const userIsLoggedIn = !!user.id;

  if (!userIsLoggedIn) {
    const { open } = useDialogContext();

    return (
      <div className="flex flex-row gap-4 text-xl relative">
        <ClassicButton onClick={() => open("register")}>Register</ClassicButton>
        <LoginButton onClick={() => open("login")}>sign up</LoginButton>
      </div>
    );
  }

  const avatarPath = `/avatars/${user.avatar}`;

  return (
    <div className="flex h-25 bottom-10 flex-row gap-2 text-xl relative bg-[#1e1e2f]/60 rounded-lg p-3 text-[#9F9FC9]">
      <img src={avatarPath} alt={user.avatar} className="size-18 rounded-lg" />
      <div className="flex flex-col text-sm mr-10">
        <div className="flex flex-row gap-1">
          <span>Hello, </span>
          <b className="text-[#9686ff]">{user.name}</b> !
        </div>
        <span>
          Points: <span className="text-[#9686ff]">{user.points}</span>
        </span>
        <span>
          Role: <span className="text-[#9686ff]">{user.role}</span>
        </span>
        <div>Logout</div>
      </div>
    </div>
  );
}

export default function NavigationBar() {
  const { user } = useUserContext();

  return (
    <nav className="w-full h-13 flex flex-row justify-around text-white absolute bottom-16">
      <span>
        <h2>Logo</h2>
      </span>
      <UserPanel user={user} />
    </nav>
  );
}
