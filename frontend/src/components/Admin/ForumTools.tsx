import { Settings } from "lucide-react";
import CreateSection from "../Dialog/CreateSection";
import MultiDialog, { MultiDialogProps } from "../Dialog/MultiDialog";
import ForumButton from "../Utils/Buttons/ForumButton";
import { useDialogContext } from "@/context/DialogContext";
import CreateCategory from "../Dialog/CreateCategory";

export function ForumToolsMenu() {
  const { open } = useDialogContext();

  function openWindow() {
    open("createSection");
  }

  return (
    <ForumButton className="w-full" onClick={openWindow}>
      <Settings size={12} />
      Section tools
    </ForumButton>
  );
}

export default function ({ type }: { type: "section" | "category" }) {
  const data: MultiDialogProps[] = [
    {
      name: "Create section",
      header: "",
      default: type === "section" ? true : false,
      view: CreateSection,
    },
    {
      name: "Create category",
      header: "",
      default: type === "category" ? true : false,
      view: CreateCategory,
    },
  ];

  return <MultiDialog views={data} />;
}
