export default function RegisterButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      className="text-[12px] uppercase font-bold p-3 w-32 h-10 tracking-[1.2px]
      bg-black/[.5]
      rounded-lg cursor-pointer flex items-center justify-center gap2 flex-row-reverse"
    >
      {children}
    </button>
  );
}
