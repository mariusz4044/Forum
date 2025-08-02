"use client";

import TopicHeader from "@/components/Utils/Forum/TopicHeader";
import Topic from "@/components/Utils/Forum/Topic";

import useSWR from "swr";
import fetcherGet from "@/functions/fetcherGet";
import Loading from "@/components/Utils/Universal/Loading";

interface Category {
  id: number;
  title: string;
  description: string;
  _count: {
    topics: number;
  };
  categoryId: number;
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
    structure.push(<TopicHeader title={section.title} key={section.title} />);
    section.categories.forEach((category: Category) => {
      structure.push(
        <Topic
          title={category.title}
          description={category.description}
          iconPath="TopicIcons/topic1.png"
          messagesCount={category._count.topics}
          lastPost={{
            userName: "Lorem Ipsum",
            date: "Dziś 09:34",
            topicName: "Lorem Ipsum",
            avatar: "/avatars/avatar2.png",
          }}
          key={category.title}
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
