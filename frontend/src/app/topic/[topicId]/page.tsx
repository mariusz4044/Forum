"use client";

import { formatDateToRelative } from "@/functions/formatDateToRelative";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import fetcherGet from "@/functions/fetcherGet";
import Loading from "@/components/Utils/Universal/Loading";
import { PostBox, PostBoxUserPanel } from "@/components/Topic/PostBox";
import { JSX, useEffect, useRef, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import ForumButton from "@/components/Utils/Buttons/ForumButton";
import { fetchData } from "@/functions/fetchData";
import { PageNavigation } from "@/components/PageNavigation";
import { Plus } from "lucide-react";

export interface PostProps {
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  createdAt: string;
  message: string;
  id: number;
}

interface TopicHeaderProps {
  authorAvatar: string;
  authorName: string;
  createdAt: string;
  title: string;
}

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

function TopicInfoHeader({
  authorAvatar,
  authorName,
  createdAt,
  title,
}: TopicHeaderProps) {
  return (
    <div
      className="h-auto w-full bg-[#1e1e2f]/[.5] rounded-xl p-6"
      style={{ border: "1px solid rgba(58, 58, 95, 0.29)" }}
    >
      <h1 className="text-xl ml-2">{title}</h1>
      <div className="bg-[#6161614d] mt-4 h-[1px]"></div>
      <div className="flex flex-row items-center mt-4">
        <img
          src={`/avatars/${authorAvatar}`}
          alt="user avatar"
          className="size-12 opacity-70 rounded-full ml-1"
        />
        <div className="flex flex-col text-sm justify-center ml-2">
          <span>From {authorName}</span>
          <span className="text-[#9F9FC9] text-sm">
            created {formatDateToRelative(createdAt)}
          </span>
        </div>
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
  const { data, error, isLoading } = useSWR(mutateString, fetcherGet);

  const resData = data?.data;

  if (!resData || isLoading) return <Loading />;

  let posts: JSX.Element[] = [];

  resData.posts.forEach((post: PostProps) => {
    posts.push(<PostBox postData={post} key={`post-${post.id}`} />);
  });

  function onChangePage(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
    setPage(newPage);
  }

  return (
    <div className="flex w-[80%] ml-[10%] flex-col mt-10">
      <header>
        <TopicInfoHeader
          authorAvatar={resData.createdBy.avatar}
          title={resData.title}
          authorName={resData.createdBy.name}
          createdAt={resData.createdAt}
        />
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
  );
}
