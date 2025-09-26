import useSWR from "swr";
import fetcherGet from "@/functions/fetcherGet";

interface PaginationGetDataHook {
  url: string;
  page: number;
  cursor: { current: string | null };
  direction: { current: "next" | "prev" };
}

export default ({ url, page, cursor, direction }: PaginationGetDataHook) => {
  const buildUrl = () => {
    const baseUrl = url;
    const queryParams = new URLSearchParams({ page: String(page) });

    if (cursor.current) queryParams.set("cursor", cursor.current);
    if (direction.current) queryParams.set("direction", direction.current);

    return `${baseUrl}?${queryParams.toString()}`;
  };

  return useSWR(buildUrl, fetcherGet);
};
