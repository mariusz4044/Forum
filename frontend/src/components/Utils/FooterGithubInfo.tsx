import { Github } from "lucide-react";

export default function () {
  return (
    <div className="opacity-50 w-full bg-[#1e1e2f] fixed bottom-0 flex flex-row gap-2 h-8 justify-center items-center text-xs">
      <span>Made with 💗</span>
      <div className="w-[1px] h-1/2 bg-gray-400"></div>
      <a
        href="https://github.com/mariusz4044/forum"
        className="flex flex-row gap-2 items-center"
      >
        <Github size={12} /> open-soruce
      </a>
    </div>
  );
}
