import Window from "@/components/Utils/Universal/Window";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import { fetchData } from "@/functions/fetchData";
import { useDialogContext } from "@/context/DialogContext";

import { PostProps } from "@/types/types";
import { useSWRConfig } from "swr";
import { getSWRKey } from "../Utils/getSWRKey";
import { FormInput } from "../Utils/Universal/FormInput";

export default function BanUserWindow() {
  const { close, data } = useDialogContext();
  const post: PostProps = data!;

  const { mutate, cache } = useSWRConfig();

  function reloadSwrFetch() {
    const SWRString = getSWRKey(cache, "/forum/topic");
    mutate(SWRString);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dataForm = {
      reson: formData.get("Reason"),
      userId: formData.get("User ID"),
      banLength: formData.get("Length (mins)"),
    };

    await fetchData("/api/user/ban", {
      userId: dataForm?.userId,
      reason: dataForm.reson,
      banLength: dataForm.banLength,
    });

    reloadSwrFetch();
    close();
  }

  return (
    <Window title={`Ban menu`}>
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <FormInput
            name="User ID"
            type="number"
            defaultValue={post.author.id!}
            height={32}
          ></FormInput>
          <FormInput
            name="Reason"
            placeholder="Enter ban reason..."
            height={32}
          ></FormInput>
          <FormInput
            name="Length (mins)"
            type="number"
            placeholder="Enter ban time in minutes..."
            height={32}
          ></FormInput>
        </div>
        <ClassicButton type="submit" className="w-full mt-2">
          Ban user
        </ClassicButton>
      </form>
    </Window>
  );
}
