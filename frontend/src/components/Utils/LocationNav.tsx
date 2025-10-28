import { Location } from "@/types/types";
import { ArrowLeft, ChevronRight, Home, HomeIcon } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Fragment } from "react";

function LocationSeparator() {
  return <ChevronRight size={13} />;
}

function MobileNavLocation({ location }: { location: Location | undefined }) {
  if (!location) return null;

  return (
    <>
      <Link
        href={location.href}
        className="flex flex-row gap-2 justify-center items-center"
      >
        <ArrowLeft size={16} />
        {location.name}
      </Link>
    </>
  );
}

export default function LocationNav({ data }: { data: Location[] }) {
  let elements = [];
  const isMobile = useIsMobile(500);
  const lastNavElement: Location | undefined = data.at(-2);

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
    <div className="flex flex-row gap-1 items-center ml-4 max-sm:ml-1 max-sm:mb-3 text-[#ccc]">
      {isMobile && <MobileNavLocation location={lastNavElement} />}
      {!isMobile && (
        <Fragment>
          <Link href="/">
            <Home size={16} />
          </Link>
          <LocationSeparator />
          {elements}
        </Fragment>
      )}
    </div>
  );
}
