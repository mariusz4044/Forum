"use client";

import TopicHeader from "@/components/Utils/Forum/TopicHeader";
import Topic from "@/components/Utils/Forum/Topic";

import useSWR from "swr";
import fetcherGet from "@/functions/fetcherGet";
import Loading from "@/components/Utils/Universal/Loading";
import { User } from "@/context/UserContext";

export interface LastPost {
  topic: {
    id: number;
    title: string;
  };
  author: User;
  message: string;
  createdAt: string;
}

interface Category extends LastPost {
  id: number;
  title: string;
  description: string;
  _count: {
    topics: number;
  };
  categoryId: number;
  lastPost: LastPost;
}

interface Section {
  id: number;
  title: string;
  categories: Category[];
}

export default function Home() {
  const { data, error, isLoading } = useSWR(
    `${process.env.SERVER_URL}/api/forum`,
    fetcherGet,
    {
      shouldRetryOnError: false,
    },
  );

  if (data?.length === 0 || !data) {
    return <h1>Please, reflesh the page!</h1>;
  }

  const structure = [];

  for (const section of data) {
    structure.push(
      <TopicHeader title={section.title} key={section.title} id={section.id} />,
    );
    section.categories.forEach((category: Category) => {
      structure.push(
        <Topic
          title={category.title}
          categoryId={category.id}
          description={category.description}
          iconPath="TopicIcons/topic1.png"
          messagesCount={category._count.topics}
          lastPost={category.lastPost}
          key={`${category.id}-${category.title}`}
        />,
      );
    });
  }

  return (
    <main className="w-full flex justify-center items-center flex-row mt-10">
      <div className="w-[70%] h-full ">{structure.length > 0 && structure}</div>
    </main>
  );
}
