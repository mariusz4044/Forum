import {
  SettingsBox,
  SettingsContent,
  SettingsHeader,
  SettingsHeaderText,
  SettingsSubHeaderText,
} from "@/components/Settings/SettingsBox";
import UploadAvatarBox from "@/components/Settings/UploadAvatarBox";
import { ReactNode } from "react";
import { UserSettingsData } from "@/types/types";

export default function ({ data }: { data: UserSettingsData }) {
  return (
    <SettingsBox>
      <SettingsHeader>
        <SettingsHeaderText>User profile</SettingsHeaderText>
        <SettingsSubHeaderText>
          Customize your appearance on the forum
        </SettingsSubHeaderText>
      </SettingsHeader>
      <SettingsContent>
        <UploadAvatarBox />
      </SettingsContent>
    </SettingsBox>
  );
}
