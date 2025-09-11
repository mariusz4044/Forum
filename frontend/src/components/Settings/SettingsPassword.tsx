import {
  SettingsBox,
  SettingsContent,
  SettingsHeader,
  SettingsHeaderText,
  SettingsSubHeaderText,
} from "@/components/Settings/SettingsBox";
import React, { useId } from "react";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import { fetchData } from "@/functions/fetchData";
import { toast } from "react-toastify";

function PassInput({ labelText, name }: { labelText: string; name: string }) {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm text-[#ddd]">
        {labelText}
      </label>
      <input
        name={name}
        type="password"
        id={inputId}
        placeholder="*******"
        className="w-full bg-[#ffffff0d] border-1 border-[#ffffff1a] p-3 rounded-xl"
      />
    </div>
  );
}

function ChangePasswordForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const newPassword = formData.get("new-password") as string;
    const repeatPassword = formData.get("repeat-password") as string;

    if (newPassword !== repeatPassword) {
      toast.error("Password and repeated password do not match!", {
        theme: "dark",
      });
      return;
    }

    if (!password) {
      toast.error("Please enter current password!", {
        theme: "dark",
      });

      return;
    }

    await fetchData(
      "/api/user/password",
      {
        password,
        newPassword,
      },
      "PATCH",
    );

    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <PassInput labelText="Current Password" name="password" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 mt-8">
        <PassInput labelText="New Password" name="new-password" />
        <PassInput labelText="Repeat Password" name="repeat-password" />
      </div>
      <ClassicButton className="mt-6 w-full">Save</ClassicButton>
    </form>
  );
}

export default function () {
  return (
    <SettingsBox>
      <SettingsHeader>
        <SettingsHeaderText>Account security</SettingsHeaderText>
        <SettingsSubHeaderText>Keep your account secure</SettingsSubHeaderText>
      </SettingsHeader>
      <SettingsContent>
        <ChangePasswordForm />
      </SettingsContent>
    </SettingsBox>
  );
}
