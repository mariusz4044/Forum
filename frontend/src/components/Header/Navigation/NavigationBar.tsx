"use client";

import LoginButton from "@/components/Utils/Buttons/LoginButton";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import { useDialogContext } from "@/context/DialogContext";
import { User, useUserContext } from "@/context/UserContext";

import Link from "next/link";
import { UserNick } from "@/components/Utils/UserNick";
import { UserAvatar } from "@/components/Utils/UserAvatar";
import { Settings } from "lucide-react";
import Image from "next/image";

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

  return (
    <div
      className="flex flex-col bg-[#1a1a2ecc] p-4 rounded-xl w-64 w-hauto  relative"
      style={{
        border: "1px solid rgba(86, 105, 219, 0.2)",
      }}
    >
      <div className="flex flex-row gap-2">
        <UserAvatar user={user} className="size-16 rounded-lg" />
        <div className="flex flex-col ">
          <span>
            Hello, <UserNick user={user} />
          </span>
          <span className="text-gray-400 text-[12px]">{user.role}</span>
          <Link href="/settings">
            <div className="text-gray-400 text-[12px] flex flex-row gap-1 items-center">
              <Settings size={12} />
              <span>Account settings</span>
            </div>
          </Link>
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
    <nav className="w-[75%] ml-[7%] h-full flex flex-row text-white justify-between absolute items-center max-sm:w-full max-sm:flex-col max-sm:ml-0 max-sm:justify-center">
      <span className="size-56 relative hover:opacity-50 max-sm:size-32">
        <Link href="/">
          <Image src="/images/logo.webp" alt="Logo forum" fill />
        </Link>
      </span>
      <UserPanel user={user} logout={logout} />
    </nav>
  );
}
