"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import fetcherGet from "@/functions/fetcherGet";
import { PageNavigation } from "@/components/PageNavigation";
import Loading from "@/components/Utils/Universal/Loading";
import ForumButton from "@/components/Utils/Buttons/ForumButton";
import { Plus } from "lucide-react";
import { TopicBox } from "@/components/Topic/TopicBox";
import { ReactNode, useRef } from "react";
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
  // context
  const { user } = useUserContext();
  const { open } = useDialogContext();

  // routing
  const router = useRouter();
  const { categoryId } = useParams();
  const searchParams = useSearchParams();

  // pagination
  const page = Number(searchParams.get("page") ?? 1);
  const cursor = useRef<string | null>(null);
  const direction = useRef<"next" | "prev">("next");

  const createNewTopic = () => open("topic");

  const buildUrl = () => {
    const baseUrl = `${process.env.SERVER_URL}/api/forum/category/${categoryId}`;
    const queryParams = new URLSearchParams({ page: String(page) });

    if (cursor.current) queryParams.set("cursor", cursor.current);
    if (direction.current) queryParams.set("direction", direction.current);

    return `${baseUrl}?${queryParams.toString()}`;
  };

  const { data, error } = useSWR(buildUrl, fetcherGet);
  const topics: TopicProps[] | undefined = data?.data?.topics;

  if (!data || !topics || error) {
    return <Loading />;
  }

  const topicList: ReactNode[] = [];
  topics.forEach((topic) => {
    topicList.push(<TopicBox topic={topic} key={`topic-${topic.id}`} />);
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

  return (
    <main className="w-full flex justify-center items-center flex-row mt-10">
      <div className="w-[70%] h-full max-sm:w-full max-sm:mx-3">
        <header>
          <PageNavigation
            onChangePage={onChangePage}
            navigation={data.navigation}
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
            navigation={data.navigation}
            reversed={true}
          ></PageNavigation>
        </footer>
      </div>
    </main>
  );
}
