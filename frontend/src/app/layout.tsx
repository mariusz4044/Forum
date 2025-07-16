import "./globals.css";
import React from "react";

//Components
import Header from "@/components/Header/Header";
import HomePage from "@/views/forum/HomePage";
import DialogWindow from "@/components/Dialog/DialogWindow";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id={"root"}>
        <Header />
        <DialogWindow />
        <HomePage />
      </body>
    </html>
  );
}
