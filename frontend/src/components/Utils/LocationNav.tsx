import { Location } from "@/types/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

function LocationSeparator() {
  return <ChevronRight size={13} />;
}

export default function LocationNav({ data }: { data: Location[] }) {
  let elements = [];

  for (const location of data) {
    elements.push(
      <div
        key={location.id}
        className="flex flex-row items-center gap-1 text-sm"
      >
        <Link href={location.href}>{location.name}</Link>
        {location.id !== data!.at(-1)!.id && <LocationSeparator />}
      </div>,
    );
  }

  return (
    <div className="flex flex-row gap-1 items-center ml-4 text-[#ccc]">
      {elements}
    </div>
  );
}
