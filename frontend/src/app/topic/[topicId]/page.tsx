"use client";

import { formatDateToRelative } from "@/functions/formatDateToRelative";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import fetcherGet from "@/functions/fetcherGet";
import Loading from "@/components/Utils/Universal/Loading";
import { PostBox } from "@/components/Topic/PostBox";
import { JSX } from "react";

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

interface PostReponse {
  createdAt: string;
  post: PostProps[];
  navigation?: {
    [key: string]: [number];
  };
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
      <footer className="h-auto w-full bg-[#1e1e2f]/[.5] rounded-xl p-6 mt-10 mb-20"></footer>
    </div>
  );
}
