import "./globals.css";
import React from "react";

import Image from "next/image";

//Components
import Header from "@/components/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body id={"root"}>
        <Header />
      </body>
    </html>
  );
}
