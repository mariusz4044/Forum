"use client";

import { formatDateToRelative } from "@/functions/formatDateToRelative";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import fetcherGet from "@/functions/fetcherGet";
import Loading from "@/components/Utils/Universal/Loading";
import { PostBox, PostBoxUserPanel } from "@/components/Topic/PostBox";
import { JSX, useRef, useState } from "react";
import { useUserContext } from "@/context/UserContext";
import ClassicButton from "@/components/Utils/Buttons/ClassicButton";
import ForumButton from "@/components/Utils/Buttons/ForumButton";
import { fetchData } from "@/functions/fetchData";

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

function NewPostElement() {
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

    await mutate(`${process.env.SERVER_URL}/api/forum/topic/${topicId}`);
    setMessage("");
    buttonRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="h-auto w-full bg-[#1e1e2f]/[.5] rounded-xl p-6 mt-10 mb-20 border-1 border-[#2d2d53] flex flex-row">
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
  const { topicId } = useParams();

  const { data, error, isLoading } = useSWR(
    `${process.env.SERVER_URL}/api/forum/topic/${topicId}`,
    fetcherGet,
  );

  const resData = data?.data;

  if (!resData || isLoading) return <Loading />;

  let posts: JSX.Element[] = [];

  resData.posts.forEach((post: PostProps) => {
    posts.push(<PostBox postData={post} key={`post-${post.id}`} />);
  });

  return (
    <div className="flex w-[80%] ml-[10%] flex-col mt-10">
      <header
        className="h-auto w-full bg-[#1e1e2f]/[.5] rounded-xl p-6"
        style={{ border: "1px solid rgba(58, 58, 95, 0.29)" }}
      >
        <h1 className="text-xl ml-2">{resData.title}</h1>
        <div className="bg-[#6161614d] mt-4 h-[1px]"></div>
        <div className="flex flex-row items-center mt-4">
          <img
            src={`/avatars/${resData.createdBy.avatar}`}
            alt="user avatar"
            className="size-12 opacity-70 rounded-full ml-1"
          />
          <div className="flex flex-col text-sm justify-center ml-2">
            <span>From {resData.createdBy.name}</span>
            <span className="text-[#9F9FC9] text-sm">
              created {formatDateToRelative(resData.createdAt)}
            </span>
          </div>
        </div>
      </header>
      <main className="mt-10">{posts}</main>
      <footer>
        <NewPostElement />
      </footer>
    </div>
  );
}
