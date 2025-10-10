import { Wind } from "lucide-react";
import LoginWindow from "./LoginWindow";
import MultiDialog from "./MultiDialog";
import RegisterWindow from "./RegisterWindow";
import Window from "../Utils/Universal/Window";

export default function ({ type }: { type: "register" | "login" }) {
  return (
    <MultiDialog
      views={[
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
      ]}
    />
  );
}
