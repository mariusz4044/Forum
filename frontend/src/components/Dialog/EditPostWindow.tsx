import Window from "@/components/Utils/Universal/Window";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import { fetchData } from "@/functions/fetchData";
import { useDialogContext } from "@/context/DialogContext";

import {
  FormInput,
  FormInputArea,
} from "@/components/Utils/Universal/FormInput";
import { PostProps } from "@/types/types";
import { FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { mutate } from "swr";
import getPageNumber from "../Utils/getPageNumber";

export default function EditPostEditPostWindow() {
  const { close, data } = useDialogContext();
  const post: PostProps = data!;

  const { page } = getPageNumber();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dataForm = {
      message: formData.get("Post"),
      reason: formData.get("Reason"),
    };

    await fetchData("/api/post/edit", {
      message: dataForm.message,
      postId: post.id,
      reason: dataForm.reason,
    });

    close();

    // reload updated data
    mutate([`topic/${post.topicId}`, page]);
  }

  return (
    <Window title={`Edit "${post?.author?.name}" post`}>
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <FormInput name="Reason" placeholder="Not required"></FormInput>
          <FormInputArea
            name="Post"
            height={32}
            defaultValue={post?.message}
          ></FormInputArea>
        </div>
        <ClassicButton type="submit" className="w-full mt-2">
          Edit
        </ClassicButton>
      </form>
    </Window>
  );
}
