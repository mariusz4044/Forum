import Window from "@/components/Utils/Universal/Window";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import FormInput from "@/components/Utils/Universal/FormInput";

export default function RegisterWindow() {
  return (
    <Window title="Login">
      <form>
        <div className="form-element">
          <FormInput name="Username"></FormInput>
        </div>
        <div className="form-element">
          <FormInput name="Password"></FormInput>
        </div>
        <ClassicButton type="submit" className="w-full mt-3">
          Sign Up
        </ClassicButton>
      </form>
    </Window>
  );
}
