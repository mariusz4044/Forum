import Window from "@/components/Utils/Universal/Window";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import { fetchData } from "@/functions/fetchData";
import { useDialogContext } from "@/context/DialogContext";

import { FormInputArea } from "@/components/Utils/Universal/FormInput";
import { PostProps } from "@/types/types";

export default function EditPostEditPostWindow() {
  const { close, data } = useDialogContext();
  const post: PostProps = data!;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      message: formData.get("Post"),
    };

    await fetchData("/api/post/edit", {
      message: data.message,
    });

    close();
  }

  return (
    <Window title={`Edit ${post?.author?.name} post`}>
      <form onSubmit={handleSubmit}>
        <div className="form-element">
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
