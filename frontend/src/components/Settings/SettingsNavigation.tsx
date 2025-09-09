"use client";

import { SettingsBox } from "@/components/Settings/SettingsBox";
import { UserAvatar } from "@/components/Utils/UserAvatar";
import { useUserContext } from "@/context/UserContext";
import { ReactNode } from "react";
import { BadgeProfile } from "@/components/Dialog/UserProfileWindow";
import { Accessibility, Clock, User } from "lucide-react";

function NavigationButton({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  let styles = `w-full h-12 flex flex-row gap-2 text-sm items-center pl-4 cursor-pointer hover:bg-[#ffffff0d] rounded-xl`;

  if (active) {
    styles += ` text-[white] border-1 border-[#7c7fc64d]
     bg-[linear-gradient(135deg,rgba(124,127,198,0.2)_0%,rgba(255,119,198,0.2)_100%)]
     `;
  } else {
    styles += ` text-[#ccc]`;
  }

  return <div className={styles}>{children}</div>;
}

export default function () {
  const { user } = useUserContext();

  return (
    <SettingsBox>
      <div className="size-full items-center justify-center flex flex-col p-7">
        <div className="flex flex-col items-center justify-center gap-2">
          <UserAvatar
            user={user}
            size={{ width: 75, height: 75 }}
            className="rounded-full"
          ></UserAvatar>
          <BadgeProfile text={user.role} />
        </div>
        <div className="w-full mt-4 flex flex-col gap-2">
          <NavigationButton active={true}>
            <Accessibility />
            <span>Profile</span>
          </NavigationButton>
          <NavigationButton>
            <User />
            <span>Account Information</span>
          </NavigationButton>
          <NavigationButton>
            <Clock />
            <span>Security</span>
          </NavigationButton>
        </div>
      </div>
    </SettingsBox>
  );
}
