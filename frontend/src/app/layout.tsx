"use client";

import "./globals.css";
import React from "react";
import { useState } from "react";

//Components
import Header from "@/components/Header/Header";
import Home from "@/app/page";
import LoginWindow from "@/components/Dialog/LoginWindow";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id={"root"}>
        <Header />
        <Home />
        <LoginWindow />
      </body>
    </html>
  );
}
