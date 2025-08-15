"use client";

import LoginButton from "@/components/Utils/Buttons/LoginButton";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import { useDialogContext } from "@/context/DialogContext";
import { User, useUserContext } from "@/context/UserContext";

import Link from "next/link";
import { UserNick } from "@/components/Utils/UserNick";

function UserPanel({ user, logout }: { user: User; logout: () => void }) {
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
    <div
      className="flex flex-col bg-[#1a1a2ecc] p-4 rounded-xl w-64 w-hauto  relative"
      style={{
        border: "1px solid rgba(86, 105, 219, 0.2)",
      }}
    >
      <div className="flex flex-row gap-2">
        <img src={`/avatars/${user.avatar}`} className="size-16 rounded-lg" />
        <div className="flex flex-col ">
          <span>
            Hello, <UserNick user={user} />
          </span>
          <span className="text-gray-400 text-sm">{user.role}</span>
        </div>
      </div>
      <button
        className="w-full bg-[#ff47571a] text-sm border-1 border-[#ff47574d] rounded-lg mt-4 p-1 hover:scale-105 font-light cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default function NavigationBar() {
  const { user, logout } = useUserContext();

  return (
    <nav className="w-full h-full flex flex-row justify-around text-white absolute items-center">
      <span>
        <Link href="/">LOGO</Link>
      </span>
      <UserPanel user={user} logout={logout} />
    </nav>
  );
}
