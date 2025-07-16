import Window from "@/components/Utils/Universal/Window";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import FormInput from "@/components/Utils/Universal/FormInput";

export default function DialogWindow() {
  return (
    <Window title="Register">
      <form>
        <div className="form-element">
          <FormInput name="Username"></FormInput>
        </div>
        <div className="form-element">
          <FormInput name="Password"></FormInput>
        </div>
        <div className="form-element">
          <FormInput name="Repeat Password"></FormInput>
        </div>
        <ClassicButton type="submit"> Sign Up</ClassicButton>
      </form>
    </Window>
  );
}
