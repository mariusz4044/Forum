"use client";
import useSWR from "swr";

import "./globals.css";
import React, { useEffect } from "react";

//animations
import { ToastContainer, toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";

//Components
import Header from "@/components/Utils/Header";
import RegisterWindow from "@/components/Dialog/RegisterWindow";
import LoginWindow from "@/components/Dialog/LoginWindow";

//Context's
import { useDialogContext } from "@/context/DialogContext";
import { Providers } from "@/app/providers";
import Loading from "@/components/Utils/Universal/Loading";
import fetcherGet from "@/functions/fetcherGet";
import { useUserContext } from "@/context/UserContext";
import NewTopicWindow from "@/components/Dialog/NewTopicWindow";
import EditPostEditPostWindow from "@/components/Dialog/EditPostWindow";
import BanUserWindow from "@/components/Dialog/BanUserWindow";

type DialogTypes = "Register" | "Login";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id={"root"}>
        <Providers>
          <Content>{children}</Content>
        </Providers>
      </body>
    </html>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const { mode } = useDialogContext();

  return (
    <>
      {/*Header (login/register/show user)*/}
      <Header />
      {/*Router view*/}
      {children}
      {/*Dialogs*/}
      <AnimatePresence>
        {mode === "login" && <LoginWindow />}
        {mode === "register" && <RegisterWindow />}
        {mode === "topic" && <NewTopicWindow />}
        {mode === "editPost" && <EditPostEditPostWindow />}
        {mode === "banUser" && <BanUserWindow />}
      </AnimatePresence>
      <ToastContainer />
    </>
  );
}
