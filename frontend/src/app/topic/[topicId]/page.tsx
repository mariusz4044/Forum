"use client";

import { formatDateToRelative } from "@/functions/formatDateToRelative";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import fetcherGet from "@/functions/fetcherGet";
import Loading from "@/components/Utils/Universal/Loading";
import { PostBox, PostBoxUserPanel } from "@/components/Topic/PostBox";
import { createContext, JSX, useRef, useState } from "react";
import { User, useUserContext } from "@/context/UserContext";
import ForumButton from "@/components/Utils/Buttons/ForumButton";
import { fetchData } from "@/functions/fetchData";
import { PageNavigation } from "@/components/PageNavigation";

import { PostProps, TopicResponseData } from "@/types/types";
import { TopicHeader } from "@/components/Topic/TopicHeader";
import { TopicContext } from "@/context/TopicContext";

function NewPostElement({
  mutateString,
}: {
  mutateString: string;
}): JSX.Element {
  const [message, setMessage] = useState("");
  const { user } = useUserContext();
  const { topicId = 0 } = useParams();
  const { mutate } = useSWRConfig();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  async function handleSubmit() {
    await fetchData("/api/forum/post/create", {
      topicId: +topicId,
      message: message,
    });

    await mutate(mutateString);
    setMessage("");
    buttonRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="h-auto w-full bg-[#1e1e2f]/[.5] rounded-xl p-6 border-1 border-[#2d2d53] flex flex-row">
      <PostBoxUserPanel avatar={user.avatar} role={user.role} />
      <div className="w-full ml-4 flex flex-col gap-4">
        <b className="text-sm">Add new post:</b>
        <textarea
          className="right bg-[#1e1e2f80] w-full h-auto rounded-sm min-h-32 p-4 resize-none"
          placeholder="Type your answer..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <ForumButton className="w-full" onClick={handleSubmit}>
          <span ref={buttonRef}>Create Post</span>
        </ForumButton>
      </div>
    </div>
  );
}

export default function postsView() {
  const { user } = useUserContext();
  const { topicId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [page, setPage] = useState(() => {
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(pageFromUrl) ? 1 : pageFromUrl;
  });

  const mutateString = `${process.env.SERVER_URL}/api/forum/topic/${topicId}?page=${page}`;
  const { data, isLoading } = useSWR(mutateString, fetcherGet);

  const resData: TopicResponseData | undefined = data?.data;
  if (!resData || isLoading) return <Loading />;

  let posts: JSX.Element[] = [];
  resData.posts.forEach((post: PostProps) => {
    posts.push(
      <PostBox
        postData={post}
        key={`post-${post.id}`}
        mutateString={mutateString}
      />,
    );
  });

  function onChangePage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
    setPage(newPage);
  }

  return (
    <TopicContext value={resData}>
      <div className="flex w-[80%] ml-[10%] flex-col mt-10">
        <header>
          <TopicHeader />
          <div className="mt-2">
            <PageNavigation
              onChangePage={onChangePage}
              currentPage={data.navigation.currentPage}
              maxPage={data.navigation.maxPage}
            ></PageNavigation>
          </div>
        </header>
        <main className="mt-10">{posts}</main>
        <footer className=" mt-10 mb-20 ">
          {user.id && <NewPostElement mutateString={mutateString} />}
        </footer>
      </div>
    </TopicContext>
  );
}
