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
        <div className="flex flex-row gap-2 items-center my-2 ml-1">
          <input type="checkbox" id="rules-checkbox" required />
          <label htmlFor="rules-checkbox">Accept terms and conditions</label>
        </div>

        <ClassicButton type="submit" className="w-full">
          {" "}
          Sign Up
        </ClassicButton>
      </form>
    </Window>
  );
}
