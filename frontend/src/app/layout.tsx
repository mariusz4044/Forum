import "./globals.css";
import React from "react";

import Image from "next/image";

//Components
import Header from "@/components/Header/Header";
import HomePage from "@/views/forum/HomePage";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id={"root"}>
        <Header />
        <HomePage />
      </body>
    </html>
  );
}
