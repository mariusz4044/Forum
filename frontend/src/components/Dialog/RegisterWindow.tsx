import Window from "@/components/Utils/Universal/Window";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import { FormInput } from "@/components/Utils/Universal/FormInput";
import { fetchData } from "@/functions/fetchData";
import { toast } from "react-toastify";
import { useDialogContext } from "@/context/DialogContext";
import { useUserContext } from "@/context/UserContext";

export default function RegisterWindow() {
  const { open, close } = useDialogContext();
  const { setNewUser } = useUserContext();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get("Username"),
      password: formData.get("Password"),
      login: formData.get("Login"),
      repeatPassword: formData.get("Repeat Password"),
    };

    if (data.password !== data.repeatPassword) {
      return toast.error("Passwords is different!");
    }

    const res = await fetchData("/api/user/register", data);

    if (res.error) return;

    setNewUser(res.data);
    close();
  }

  return (
    <Window title="Register">
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <FormInput name="Login" required></FormInput>
        </div>
        <div className="form-element">
          <FormInput name="Username" required></FormInput>
        </div>
        <div className="form-element">
          <FormInput name="Password" required></FormInput>
        </div>
        <div className="form-element">
          <FormInput name="Repeat Password" required></FormInput>
        </div>
        <div className="flex flex-row gap-2 items-center my-2 ml-1">
          <input type="checkbox" id="rules-checkbox" required />
          <label htmlFor="rules-checkbox">Accept terms and conditions</label>
        </div>

        <ClassicButton type="submit" className="w-full">
          Sign Up
        </ClassicButton>
      </form>
    </Window>
  );
}
