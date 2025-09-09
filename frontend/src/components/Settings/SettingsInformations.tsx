import { Crown, Flag, Pencil, Rss, ShieldBan } from "lucide-react";
import { ReactNode } from "react";
import { UserSettingsData } from "@/types/types";
import {
  SettingsBox,
  SettingsContent,
  SettingsHeader,
  SettingsHeaderText,
  SettingsSubHeaderText,
} from "@/components/Settings/SettingsBox";
import UploadAvatarBox from "@/components/Settings/UploadAvatarBox";

function StatBox({ children }: { children: ReactNode }) {
  return (
    <div
      className="w-full h-20 bg-[#ffffff08] rounded-xl flex flex-row pl-4 gap-2 items-center"
      style={{
        borderTop:
          "1px solid linear-gradient(135deg, rgba(124, 127, 198, 0.1) 0%, rgba(255, 119, 198, 0.1) 100%)",
      }}
    >
      {children}
    </div>
  );
}
function StatSubBox({ children }: { children: ReactNode }) {
  return <div className="flex flex-col">{children}</div>;
}

function StatValue({ children }: { children: ReactNode }) {
  return <div className="text-md">{children}</div>;
}

function StatIcon({ children }: { children: ReactNode }) {
  return <div className="p-2 bg-[#ffffff1a] rounded-xl">{children}</div>;
}

function StatTitle({ children }: { children: ReactNode }) {
  return <div className="text-[#aaaaaa] text-xs">{children}</div>;
}

export default function ({ data }: { data: UserSettingsData }) {
  return (
    <SettingsBox>
      <SettingsHeader>
        <SettingsHeaderText>User stats</SettingsHeaderText>
        <SettingsSubHeaderText>
          Statistics of all achievements
        </SettingsSubHeaderText>
      </SettingsHeader>
      <SettingsContent>
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 mt-2">
          <StatBox>
            <StatIcon>
              <Crown size={23} />
            </StatIcon>
            <StatSubBox>
              <StatValue>{data.reputation}</StatValue>
              <StatTitle>Total prestige</StatTitle>
            </StatSubBox>
          </StatBox>
          <StatBox>
            <StatIcon>
              <Pencil size={23} />
            </StatIcon>
            <StatSubBox>
              <StatValue>{data.totalPosts}</StatValue>
              <StatTitle>Total posts</StatTitle>
            </StatSubBox>
          </StatBox>
          <StatBox>
            <StatIcon>
              <Rss size={23} />
            </StatIcon>
            <StatSubBox>
              <StatValue>{data.topicsCreated}</StatValue>
              <StatTitle>Total topics</StatTitle>
            </StatSubBox>
          </StatBox>
          <StatBox>
            <StatIcon>
              <Flag size={23} />
            </StatIcon>
            <StatSubBox>
              <StatValue>{data.reports}</StatValue>
              <StatTitle>Total reports</StatTitle>
            </StatSubBox>
          </StatBox>
          <StatBox>
            <StatIcon>
              <ShieldBan size={23} />
            </StatIcon>
            <StatSubBox>
              <StatValue>{data.bansReceived}</StatValue>
              <StatTitle>Total bans</StatTitle>
            </StatSubBox>
          </StatBox>
        </div>
      </SettingsContent>
    </SettingsBox>
  );
}
