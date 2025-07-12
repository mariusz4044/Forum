export default function LoginButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      className="text-[12px] uppercase font-bold p-3 w-32 h-10 tracking-[1.2px]
      bg-linear-to-r from-cyan-500 to-blue-500
      rounded-lg button-aqua-shadow cursor-pointer"
    >
      {children}
    </button>
  );
}
