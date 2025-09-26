"use client";

import { PageNavigation } from "@/components/PageNavigation";
import Loading from "@/components/Utils/Universal/Loading";
import ForumButton from "@/components/Utils/Buttons/ForumButton";
import { TopicBox } from "@/components/Topic/TopicBox";
import { useDialogContext } from "@/context/DialogContext";
import { User, useUserContext } from "@/context/UserContext";
import LocationNav from "@/components/Utils/LocationNav";
import { Category, Location, NavigationData } from "@/types/types";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import usePagination from "@/hooks/usePagination";
import usePaginationData from "@/hooks/usePaginationData";

export interface TopicProps {
  createdAt: string;
  id: string;
  title: string;
  createdBy: User;
  isOpen: boolean;
  postsCount: number;
  category: { id: number; title: string };
}

interface ResponseCategory {
  topics: TopicProps[];
  category: Category;
}

const TopicsContent = ({ topics }: { topics: TopicProps[] }) => {
  if (!topics) return;

  return (
    <>
      {topics.map((topic: TopicProps) => (
        <TopicBox topic={topic} key={`topic-${topic.id}`} />
      ))}
    </>
  );
};

const CreateNewTopicButton = () => {
  const { user } = useUserContext();
  const { open } = useDialogContext();

  const createNewTopic = () => {
    open("topic");
  };

  if (!user.id) return null;

  return (
    <ForumButton className="w-38" onClick={createNewTopic}>
      New Topic
      <Plus size={12} />
    </ForumButton>
  );
};

export default function topicView() {
  // routing
  const router = useRouter();
  const { categoryId }: { categoryId: string } = useParams();

  // pagination
  const { page, cursor, direction, onChangePage } = usePagination();

  // load category data
  const { data, error, isLoading } = usePaginationData({
    url: `${process.env.SERVER_URL}/api/forum/category/${categoryId}`,
    page,
    cursor,
    direction,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
    return <h1>Please refresh page!</h1>;
  }

  const navigation: NavigationData = data.navigation;
  const { topics, category }: ResponseCategory = data.data;

  // Location config
  let location: Location[] = [{ href: "/", name: "Home", id: 1 }];
  location.push({
    href: `/category/${category.id}`,
    id: category.id,
    name: category.title,
  });

  return (
    <main className="w-full flex justify-center items-center flex-col mt-10">
      <div className="container-70">
        <header className="flex flex-col gap-3">
          <LocationNav data={location} />
          <PageNavigation onChangePage={onChangePage} navigation={navigation}>
            <CreateNewTopicButton />
          </PageNavigation>
        </header>
        <main>
          <TopicsContent topics={topics} />
        </main>
        <footer className="mb-6">
          <PageNavigation
            onChangePage={onChangePage}
            navigation={navigation}
            reversed={true}
          ></PageNavigation>
        </footer>
      </div>
    </main>
  );
}
