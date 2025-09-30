import { useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { NavigationData } from "@/types/types";

export default () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const localCursor = useRef<string | null>(null);
  const direction = useRef<"next" | "prev">("next");

  const onChangePage = (newPage: number, data: NavigationData) => {
    const { currentPage, maxPage, cursors } = data;
    const skipCursor = searchParams.get("skipCursor");

    if (newPage < 1 || newPage > maxPage) return;

    const params = new URLSearchParams(searchParams.toString());
    localCursor.current = null;

    const pageDiff = Math.abs(newPage - currentPage);
    if (pageDiff === 1) {
      if (newPage > currentPage) {
        direction.current = "next";
        localCursor.current = String(cursors.next);
      } else {
        direction.current = "prev";
        localCursor.current = String(cursors.prev);
      }
    }

    if (skipCursor) {
      localCursor.current = null;
    }

    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { page, cursor: localCursor, direction, onChangePage };
};
