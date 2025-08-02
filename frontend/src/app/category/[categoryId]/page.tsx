"use client";

import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useUserContext } from "@/context/UserContext";
import useSWR from "swr";
import fetcherGet from "@/functions/fetcherGet";

export default function topicView() {
  const { categoryId } = useParams();

  const { data, error, isLoading } = useSWR(
    `${process.env.SERVER_URL}/api/forum/category/${categoryId}`,
    fetcherGet,
  );

  return (
    <main className="w-full flex justify-center items-center flex-row mt-10">
      <div className="w-[70%] h-full ">
        <header></header>
        <main></main>
      </div>
    </main>
  );
}
