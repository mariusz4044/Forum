import LoginWindow from "./LoginWindow";
import MultiDialog, { MultiDialogProps } from "./MultiDialog";
import RegisterWindow from "./RegisterWindow";

export default function ({ type }: { type: "register" | "login" }) {
  const data: MultiDialogProps[] = [
    {
      name: "Login",
      header: "",
      default: type === "login" ? true : false,
      view: LoginWindow,
    },
    {
      name: "Register",
      header: "",
      default: type === "register" ? true : false,
      view: RegisterWindow,
    },
  ];

  return <MultiDialog views={data} />;
}
