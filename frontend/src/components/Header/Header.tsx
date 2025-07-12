import NavigationBar from "@/components/Header/Navigation/NavigationBar";

export default function Header() {
  return (
    <header
      id={"header"}
      className="h-64 w-full bg-cover relative"
      style={{
        backgroundImage: `url("images/header_graphics_bg.jpg")`,
      }}
    >
      <NavigationBar />
    </header>
  );
}
