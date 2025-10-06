"use client";

import "./globals.css";
import React from "react";

//animations
import { ToastContainer } from "react-toastify";
import { AnimatePresence } from "framer-motion";

//Components
import Header from "@/components/Utils/Header";
import RegisterWindow from "@/components/Dialog/RegisterWindow";
import LoginWindow from "@/components/Dialog/LoginWindow";

//Context's
import { useDialogContext } from "@/context/DialogContext";
import { Providers } from "@/app/providers";
import NewTopicWindow from "@/components/Dialog/NewTopicWindow";
import EditPostEditPostWindow from "@/components/Dialog/EditPostWindow";
import BanUserWindow from "@/components/Dialog/BanUserWindow";
import UserProfileWindow from "@/components/Dialog/UserProfileWindow";
import FooterGithubInfo from "@/components/Utils/FooterGithubInfo";

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
      {/*background patten*/}
      <div className="bg-pattern"></div>
      {/*Header (login/register/show user)*/}
      <Header />
      {/*Router view*/}
      {children}
      <FooterGithubInfo />
      {/*Dialogs*/}
      <AnimatePresence mode="wait">
        {mode === "login" && <LoginWindow />}
        {mode === "register" && <RegisterWindow />}
        {mode === "topic" && <NewTopicWindow />}
        {mode === "editPost" && <EditPostEditPostWindow />}
        {mode === "banUser" && <BanUserWindow />}
        {mode === "userProfile" && <UserProfileWindow />}
      </AnimatePresence>
      <ToastContainer />
    </>
  );
}
