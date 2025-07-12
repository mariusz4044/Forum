import LoginButton from "@/components/Utils/Buttons/LoginButton";
import RegisterButton from "@/components/Utils/Buttons/RegisterButton";

export default function NavigationBar() {
  return (
    <nav className="w-full h-13 flex flex-row justify-around text-white absolute bottom-16">
      <span>
        <h2>Logo</h2>
      </span>
      <div className="flex flex-row gap-4 text-xl relative">
        <RegisterButton>Register</RegisterButton>
        <LoginButton>sign up</LoginButton>
      </div>
    </nav>
  );
}
