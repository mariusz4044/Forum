"use client";

import "./globals.css";
import React from "react";

//animations
import { AnimatePresence } from "framer-motion";

//Components
import Header from "@/components/Utils/Header";
import RegisterWindow from "@/components/Dialog/RegisterWindow";
import LoginWindow from "@/components/Dialog/LoginWindow";

//Context's
import { useDialogContext } from "@/context/DialogContext";
import { Providers } from "@/app/providers";

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
      </AnimatePresence>
    </>
  );
}
