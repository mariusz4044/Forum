"use client";

import { Location, PostAuthor, PostProps, TopicResponse } from "@/types/types";
import Loading from "@/components/Utils/Universal/Loading";
import { PostBox, PostBoxUserPanel } from "@/components/Topic/PostBox";
import { useUserContext } from "@/context/UserContext";
import ForumButton from "@/components/Utils/Buttons/ForumButton";
import { fetchData } from "@/functions/fetchData";
import { PageNavigation } from "@/components/PageNavigation";
import { TopicHeader } from "@/components/Topic/TopicHeader";
import { TopicContext, useTopicContext } from "@/context/TopicContext";
import LocationNav from "@/components/Utils/LocationNav";

import { JSX, useRef, useState, useEffect } from "react";
import { Info } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import usePagination from "@/hooks/usePagination";
import usePaginationData from "@/hooks/usePaginationData";
import { mutate } from "swr";

function NewPostElement(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, navigation } = useTopicContext();
  const { topic } = data;

  const [message, setMessage] = useState("");
  const { user } = useUserContext();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  async function handleSubmit() {
    const createPostResponse = await fetchData("/api/forum/post/create", {
      topicId: topic.id,
      message: message,
    });

    if (!createPostResponse || createPostResponse.error) return;

    const newPost: PostProps = createPostResponse.data;
    const newMaxPage = createPostResponse.data.navigation.maxPage;

    // set params to change page and scroll to new post
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newMaxPage);
    params.set("postId", `post-${newPost.id}`);

    if (newMaxPage === navigation.currentPage) {
      // revalidate posts data
      await mutate([`topic/${topic.id}`, navigation.currentPage]);
    }

    router.push(`?${params.toString()}`, { scroll: false });
    setMessage("");
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

function PostsContent({ posts }: { posts: PostProps[] }) {
  if (!posts) return null;
  return (
    <>
      {posts.map((post: PostProps) => {
        return <PostBox postData={post} key={`post-${post.id}`} />;
      })}
    </>
  );
}

function PostClose() {
  return (
    <div className=" flex flex-row gap-3 w-full bg-red-800/[0.15] text-sm border-1 border-red-500/[0.2] rounded-lg  p-4 hover:scale-105 font-light cursor-pointer">
      <Info size={18} />
      <span>The topic is closed.</span>
    </div>
  );
}

export default function PostsView() {
  // context
  const { user } = useUserContext();

  // routing
  const searchParams = useSearchParams();
  const { topicId }: { topicId: string } = useParams();

  // pagination
  const { page, cursor, direction, onChangePage } = usePagination();

  // load category data
  const { data, error, isLoading } = usePaginationData({
    url: `${process.env.SERVER_URL}/api/forum/topic/${topicId}`,
    key: `topic/${topicId}`,
    page,
    cursor,
    direction,
  });

  // auto scrolling
  useEffect(() => {
    const postId = searchParams.get("postId");
    if (!data || !postId) return;

    const postElement = document.querySelector(`#${postId}`);
    if (!postElement) return;

    postElement.scrollIntoView({
      behavior: "smooth",
    });
  }, [data, searchParams]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Please refresh page!</h1>;
  }

  // fetched data
  const postResponse: TopicResponse = data;
  const { posts, topic } = postResponse.data;
  const navigation = postResponse.navigation;

  // location;
  let location: Location[] = [
    { href: "/", name: "Home", id: 1 },
    {
      href: `/category/${topic.category.id}`,
      name: topic.category.title,
      id: topic.category.id,
    },
  ];

  location.push({
    href: `/topic/${topic.id}`,
    id: topic.id,
    name: topic.title,
  });

  return (
    <TopicContext value={postResponse}>
      <main className="w-full flex justify-center items-center flex-row mt-10">
        <div className="w-[80%] h-full max-sm:w-[90%] max-sm:ml-[5%]">
          <header className="flex flex-col gap-3">
            <LocationNav data={location} />
            <TopicHeader />
            <div className="mt-2">
              <PageNavigation
                onChangePage={onChangePage}
                navigation={navigation}
              ></PageNavigation>
            </div>
          </header>
          <main className="mt-10">
            <PostsContent posts={posts} />
          </main>
          <footer className="mt-10 mb-20">
            {user.id && topic.isOpen && <NewPostElement />}
            {!topic.isOpen && <PostClose />}
          </footer>
        </div>
      </main>
    </TopicContext>
  );
}
