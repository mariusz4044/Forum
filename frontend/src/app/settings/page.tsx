"use client";

import SettingsProfile from "@/components/Settings/SettingsProfile";
import fetcherGet from "@/functions/fetcherGet";
import Loading from "@/components/Utils/Universal/Loading";
import { UserSettingsData } from "@/types/types";
import SettingsInformations from "@/components/Settings/SettingsInformations";
import SettingsNavigation from "@/components/Settings/SettingsNavigation";
import SettingsPassword from "@/components/Settings/SettingsPassword";

import useSWR from "swr";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type navigationType = "profile" | "info" | "secure";

export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = (searchParams.get("page") as navigationType) || "profile";
  const [currentView, setCurrentView] = useState<navigationType>(page);

  const { data, error, isLoading } = useSWR(
    `${process.env.SERVER_URL}/api/user/settings`,
    fetcherGet,
    {
      shouldRetryOnError: false,
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Please reflesh page!</h1>;
  }

  const settingsData: UserSettingsData = data;

  function changeView(name: navigationType) {
    const params = new URLSearchParams("page");
    params.set("page", name);
    router.push(`?${params.toString()}`);
    setCurrentView(name);
  }

  return (
    <div className="w-full">
      <div className="container-70 ml-[15%] mt-10 settings-grid">
        <div>
          <SettingsNavigation currentNav={currentView} onChange={changeView} />
        </div>
        {currentView === "profile" && <SettingsProfile data={settingsData} />}
        {currentView === "info" && <SettingsInformations data={settingsData} />}
        {currentView === "secure" && <SettingsPassword />}
      </div>
    </div>
  );
}
