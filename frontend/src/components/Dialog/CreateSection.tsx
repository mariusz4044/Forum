import Window from "@/components/Utils/Universal/Window";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import { fetchData } from "@/functions/fetchData";
import { useDialogContext } from "@/context/DialogContext";

import { PostProps } from "@/types/types";
import { FormInput } from "../Utils/Universal/FormInput";
import { FormEvent } from "react";

export default function CreateSection() {
  const { close } = useDialogContext();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dataForm = {
      title: formData.get("Title") as string,
    };

    await fetchData("/api/forum/section/create", {
      title: dataForm.title,
    });

    close();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-element">
        <FormInput name="Title" height={32} type="text"></FormInput>
      </div>
      <ClassicButton type="submit" className="w-full mt-2">
        Create section
      </ClassicButton>
    </form>
  );
}
