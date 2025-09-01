import NavigationBar from "@/components/Header/Navigation/NavigationBar";

export default function Header() {
  return (
    <header
      id={"header"}
      className="h-64 max-sm:h-84 w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url("/images/header_graphics_bg.webp")`,
      }}
    >
      <NavigationBar />
    </header>
  );
}
