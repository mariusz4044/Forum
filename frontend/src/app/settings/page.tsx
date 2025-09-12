"use client";

import SettingsProfile from "@/components/Settings/SettingsProfile";
import fetcherGet from "@/functions/fetcherGet";
import Loading from "@/components/Utils/Universal/Loading";
import useSWR from "swr";
import { UserSettingsData } from "@/types/types";
import { useState } from "react";
import SettingsInformations from "@/components/Settings/SettingsInformations";
import SettingsNavigation from "@/components/Settings/SettingsNavigation";
import SettingsPassword from "@/components/Settings/SettingsPassword";

export type navigationType = "profile" | "info" | "secure";

export default function page() {
  const [currentView, setCurrentView] = useState<navigationType>("profile");

  const {
    data,
    isLoading,
  }: { data: UserSettingsData | null; isLoading: boolean } = useSWR(
    `${process.env.SERVER_URL}/api/user/settings`,
    fetcherGet,
    {
      shouldRetryOnError: false,
    },
  );

  if (isLoading || !data) {
    return <Loading />;
  }

  function changeView(name: navigationType) {
    setCurrentView(name);
  }

  return (
    <div className="w-full">
      <div className="container-70 ml-[15%] mt-10 settings-grid">
        <div>
          <SettingsNavigation currentNav={currentView} onChange={changeView} />
        </div>
        {currentView === "profile" && <SettingsProfile data={data} />}
        {currentView === "info" && <SettingsInformations data={data} />}
        {currentView === "secure" && <SettingsPassword />}
      </div>
    </div>
  );
}
