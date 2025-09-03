"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR, { useSWRConfig } from "swr";
import fetcherGet from "@/functions/fetcherGet";
import Loading from "@/components/Utils/Universal/Loading";
import { PostBox, PostBoxUserPanel } from "@/components/Topic/PostBox";
import { JSX, useRef, useState, ReactNode } from "react";
import { useUserContext } from "@/context/UserContext";
import ForumButton from "@/components/Utils/Buttons/ForumButton";
import { fetchData } from "@/functions/fetchData";
import { PageNavigation } from "@/components/PageNavigation";

import { PostAuthor, PostProps, TopicResponseData } from "@/types/types";
import { TopicHeader } from "@/components/Topic/TopicHeader";
import { TopicContext } from "@/context/TopicContext";
import { Info } from "lucide-react";

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
    <div className="h-auto w-full bg-[#1e1e2f]/[.5] rounded-xl p-6 border-1 border-[#2d2d53] flex flex-row max-sm:flex-col">
      <PostBoxUserPanel user={user as PostAuthor} />
      <div className="w-full ml-4 flex flex-col gap-4 max-sm:ml-0 max-sm:mt-4">
        <b className="text-sm">Add new post:</b>
        <textarea
          className="right bg-[#1e1e2f80] w-full h-auto rounded-sm min-h-32 p-4  resize-none"
          placeholder="Type your answer..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <ForumButton className="w-full h-10" onClick={handleSubmit}>
          <span ref={buttonRef}>Create Post</span>
        </ForumButton>
      </div>
    </div>
  );
}

function PostClose() {
  return (
    <div className=" flex flex-row gap-3 w-full bg-[#ff47571a] text-sm border-1 border-[#ff47574d] rounded-lg  p-4 hover:scale-105 font-light cursor-pointer">
      <Info size={18} />
      <span>The topic is closed.</span>
    </div>
  );
}

export default function postsView() {
  // context
  const { user } = useUserContext();

  // routing
  const { topicId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  // pagination
  const page = Number(searchParams.get("page") ?? 1);
  const cursor = useRef<string | null>(null);
  const direction = useRef<"next" | "prev">("next");

  const buildUrl = () => {
    const baseUrl = `${process.env.SERVER_URL}/api/forum/topic/${topicId}`;
    const queryParams = new URLSearchParams({ page: String(page) });

    if (cursor.current) queryParams.set("cursor", cursor.current);
    if (direction.current) queryParams.set("direction", direction.current);

    return `${baseUrl}?${queryParams.toString()}`;
  };

  const { data, error } = useSWR(buildUrl, fetcherGet);
  const resData: TopicResponseData | undefined = data?.data?.topic;
  const posts: PostProps[] | undefined = data?.data?.posts;

  if (!data || !posts || !resData || error) {
    return <Loading />;
  }

  if (!resData.id) {
    return <h1>Topic not exist!</h1>;
  }

  const postList: ReactNode[] = [];
  posts.forEach((post: PostProps) => {
    postList.push(<PostBox postData={post} key={`post-${post.id}`} />);
  });

  const onChangePage = (newPage: number) => {
    if (newPage < 1 || newPage > data.navigation.maxPage) return;

    const params = new URLSearchParams(searchParams.toString());
    cursor.current = null;

    const pageDiff = Math.abs(newPage - page);
    if (pageDiff === 1) {
      if (newPage > page) {
        direction.current = "next";
        cursor.current = data.navigation.cursors.next;
      } else {
        direction.current = "prev";
        cursor.current = data.navigation.cursors.prev;
      }
    }

    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const mutateString = buildUrl();

  return (
    <TopicContext value={resData}>
      <main className="w-full flex justify-center items-center flex-row mt-10">
        <div className="w-[80%] h-full max-sm:w-[90%] max-sm:ml-[5%]">
          <header>
            <TopicHeader />
            <div className="mt-2">
              <PageNavigation
                onChangePage={onChangePage}
                navigation={data.navigation}
              ></PageNavigation>
            </div>
          </header>
          <main className="mt-10">{postList}</main>
          <footer className="mt-10 mb-20">
            {user.id && resData.isOpen && (
              <NewPostElement mutateString={mutateString} />
            )}
            {!resData.isOpen && <PostClose />}
          </footer>
        </div>
      </main>
    </TopicContext>
  );
}
