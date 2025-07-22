"use client";

import LoginButton from "@/components/Utils/Buttons/LoginButton";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import { useContext } from "react";
import { useDialogContext } from "@/context/DialogContext";

export default function NavigationBar() {
  const { open } = useDialogContext();

  return (
    <nav className="w-full h-13 flex flex-row justify-around text-white absolute bottom-16">
      <span>
        <h2>Logo</h2>
      </span>
      <div className="flex flex-row gap-4 text-xl relative">
        <ClassicButton onClick={() => open("register")}>Register</ClassicButton>
        <LoginButton onClick={() => open("login")}>sign up</LoginButton>
      </div>
    </nav>
  );
}
