import Window from "@/components/Utils/Universal/Window";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import { fetchData } from "@/functions/fetchData";
import { useRouter } from "next/navigation";
import { useDialogContext } from "@/context/DialogContext";
import { useParams } from "next/navigation";
import {
  FormInput,
  FormInputArea,
} from "@/components/Utils/Universal/FormInput";

export default function NewTopicWindow() {
  const router = useRouter();
  const { categoryId = 0 } = useParams();
  const { close } = useDialogContext();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      title: formData.get("Title"),
      message: formData.get("Message"),
      categoryId: +categoryId,
    };

    const res = await fetchData("/api/forum/topic/create", data);

    if (res.error) return;

    close();
    router.push(`/topic/${res.data.id}`);
  }

  return (
    <Window title="Add new Topic">
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <FormInput
            name="Title"
            placeholder="Enter topic name"
            required
          ></FormInput>
        </div>
        <div className="form-element">
          <FormInputArea
            name="Message"
            placeholder="First message in topic..."
            required
            height={32}
          ></FormInputArea>
        </div>
        <ClassicButton type="submit" className="w-full mt-2">
          Create new Topic
        </ClassicButton>
      </form>
    </Window>
  );
}
