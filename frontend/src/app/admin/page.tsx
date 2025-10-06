"use client";

import ReportsView from "@/components/Admin/ReportsView";
import React from "react";

function HeaderButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <button
        className="px-4 py-2 rounded-xl mt-2 text-xs ml-3 tracking-wider cursor-pointer
        border border-gray-700/20 bg-gray-700/40 hover:border-gray-700/50 inset-shadow-xs inset-shadow-gray-700/80"
      >
        {children}
      </button>
    </>
  );
}

function AdminPanelHeader() {
  return (
    <div className="w-full h-13 rounded-xl bg-gray-700/[0.2] border border-gray-700/[0.4]">
      <HeaderButton>Reports</HeaderButton>
      <HeaderButton>Users</HeaderButton>
      <HeaderButton>Bans</HeaderButton>
    </div>
  );
}

export default function AdminMenu() {
  return (
    <main className="w-full flex justify-center items-center flex-col mt-10">
      <div className="container-70">
        <AdminPanelHeader />
        <div className="mt-10">
          <ReportsView />
        </div>
      </div>
    </main>
  );
}
