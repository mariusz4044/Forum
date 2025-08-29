"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import fetcherGet from "@/functions/fetcherGet";
import { PageNavigation } from "@/components/PageNavigation";
import Loading from "@/components/Utils/Universal/Loading";
import ForumButton from "@/components/Utils/Buttons/ForumButton";
import { Plus } from "lucide-react";
import { TopicBox } from "@/components/Topic/TopicBox";
import { JSX, useRef, useState } from "react";
import { useDialogContext } from "@/context/DialogContext";
import { User, useUserContext } from "@/context/UserContext";

export interface TopicProps {
  createdAt: string;
  id: string;
  title: string;
  createdBy: User;
  isOpen: boolean;
  postsCount: number;
}

export default function topicView() {
  const { user } = useUserContext();
  const { open } = useDialogContext();
  const { categoryId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const cursor = useRef(null);
  const direction = useRef("next");

  const { data, error, isLoading } = useSWR(
    `${process.env.SERVER_URL}/api/forum/category/${categoryId}?page=${page}${cursor.current ? `&cursor=${cursor.current}` : ""}${direction ? `&direction=${direction.current}` : ""}`,
    fetcherGet,
  );


  if (error) {
    return <h1>Please reflesh the page!</h1>;
  }

  if (!data) {
    return <Loading />;
  }

  const topics: TopicProps[] = data?.data?.topics;
  const topicList: JSX.Element[] = [];

  topics.forEach((topic) => {
    topicList.push(
      <TopicBox
        user={topic.createdBy}
        topic={topic}
        key={`${topic.title}-${topic.id}`}
      />,
    );
  });

  function createNewTopic() {
    open("topic");
  }

  function onChangePage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    cursor.current = null;

    if (data.navigation.maxPage < newPage) return;
    if (newPage < 1) return;
    const pageDiffNumber = Math.abs(newPage - page);

    if (newPage > page && pageDiffNumber === 1) {
      direction.current = "next"
      cursor.current = data.navigation.cursors.next;
    } else if (newPage < page && pageDiffNumber === 1) {
      direction.current = "prev";
      cursor.current = data.navigation.cursors.prev;
    }

    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  }

  return (
    <main className="w-full flex justify-center items-center flex-row mt-10">
      <div className="w-[70%] h-full max-sm:w-full max-sm:mx-3">
        <header>
          <PageNavigation
            onChangePage={onChangePage}
            currentPage={data.navigation.currentPage}
            maxPage={data.navigation.maxPage}
          >
            {user.id && (
              <ForumButton className="w-38" onClick={createNewTopic}>
                New Topic
                <Plus size={12} />
              </ForumButton>
            )}
          </PageNavigation>
        </header>
        <main>{topicList}</main>
        <footer className="mb-6">
          <PageNavigation
            onChangePage={onChangePage}
            currentPage={data.navigation.currentPage}
            maxPage={data.navigation.maxPage}
            reversed={true}
          ></PageNavigation>
        </footer>
      </div>
    </main>
  );
}
