import Window from "@/components/Utils/Universal/Window";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import { FormInput } from "@/components/Utils/Universal/FormInput";

import { fetchData } from "@/functions/fetchData";
import { useDialogContext } from "@/context/DialogContext";
import { useUserContext } from "@/context/UserContext";
import { FormEvent } from "react";
import MultiDialog from "@/components/Dialog/MultiDialog";
import FooterGithubInfo from "@/components/Utils/FooterGithubInfo";
import RegisterWindow from "./RegisterWindow";

export default function LoginWindow() {
  const { close } = useDialogContext();
  const { setNewUser } = useUserContext();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const res = await fetchData("/api/user/login", {
      login: formData.get("Username") as string,
      password: formData.get("Password") as string,
    });

    if (res.error) return;

    setNewUser(res.data);
    close();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-element">
        <FormInput name="Username" defaultValue="test1223" required></FormInput>
      </div>
      <div className="form-element">
        <FormInput
          name="Password"
          defaultValue="jacek"
          type="password"
          required
        ></FormInput>
      </div>
      <ClassicButton type="submit" className="w-full mt-3">
        Sign Up
      </ClassicButton>
    </form>
  );
}
