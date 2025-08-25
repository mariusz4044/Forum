import Window from "@/components/Utils/Universal/Window";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import { FormInput } from "@/components/Utils/Universal/FormInput";
import { fetchData } from "@/functions/fetchData";
import { useDialogContext } from "@/context/DialogContext";
import { useUserContext } from "@/context/UserContext";
import { Captcha } from "@/components/Utils/Captcha";
import { useRef, useState } from "react";

export default function RegisterWindow() {
  const { open, close } = useDialogContext();
  const { setNewUser } = useUserContext();
  const [captchaId, setCaptchaId] = useState<number>(1);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("Username"),
      password: formData.get("Password"),
      login: formData.get("Login"),
      captcha: formData.get("captcha"),
    };

    const res = await fetchData("/api/user/register", data);

    if (res.error) {
      setCaptchaId(Date.now());
      return;
    }

    setNewUser(res.data);
    close();
  }

  return (
    <Window title="Register">
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <FormInput
            name="Login"
            placeholder="Enter your login"
            required
          ></FormInput>
        </div>
        <div className="form-element">
          <FormInput
            name="Username"
            placeholder="Enter your public username"
            required
          ></FormInput>
        </div>
        <div className="form-element">
          <FormInput
            name="Password"
            placeholder="Enter your password"
            type="password"
            required
          ></FormInput>
        </div>
        <Captcha key={captchaId} />
        <div className="form-element mt-2">
          <FormInput
            name="captcha"
            hideLabel={true}
            placeholder="Captcha answer"
            required
          ></FormInput>
        </div>
        <div className="flex flex-row gap-2 items-center my-4 ml-1 text-sm">
          <input type="checkbox" id="rules-checkbox" required />
          <label htmlFor="rules-checkbox" className="mt-0.5">
            Accept terms and conditions
          </label>
        </div>

        <ClassicButton type="submit" className="w-full">
          Sign Up
        </ClassicButton>
      </form>
    </Window>
  );
}
