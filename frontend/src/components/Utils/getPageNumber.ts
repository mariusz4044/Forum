import { useSearchParams } from "next/navigation";

export default function () {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || `1`;

  return { page: parseInt(page as string) };
}
