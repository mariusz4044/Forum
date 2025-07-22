import TopicHeader from "@/components/Utils/Forum/TopicHeader";
import Topic from "@/components/Utils/Forum/Topic";

export default function Home() {
  return (
    <main className="w-full flex justify-center items-center flex-row mt-10">
      <div className=" w-[70%] h-full">
        <TopicHeader title="Lorem Ipsum" />
        <Topic
          title="Lorem Ipsum"
          description="Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          iconPath="TopicIcons/topic1.png"
          messagesCount={433}
          lastPost={{
            userName: "Lorem Ipsum",
            date: "Dziś 09:34",
            topicName: "Lorem Ipsum",
            avatar: "/avatars/avatar2.png",
          }}
        />
        <TopicHeader title="Lorem Ipsum" />
        <Topic
          title="Lorem Ipsum"
          description="Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          iconPath="/TopicIcons/topic3.png"
          messagesCount={9}
          lastPost={{
            userName: "Lorem Ipsum",
            date: "Wczoraj 19:43",
            topicName: "Lorem Ipsum",
            avatar: "/avatars/default.jpg",
          }}
        />
        <Topic
          title="Lorem Ipsum"
          description="Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          iconPath="/TopicIcons/topic2.png"
          messagesCount={963}
          lastPost={{
            userName: "Lorem Ipsum",
            date: "Wczoraj 19:43",
            topicName: "Lorem Ipsum",
            avatar: "/avatars/avatar2.png",
          }}
        />
        <Topic
          title="Lorem Ipsum"
          description="Lorem Ipsum Lorem Ipsum Lorem Ipsum"
          iconPath="/TopicIcons/topic1.png"
          messagesCount={1}
          lastPost={{
            userName: "Lorem Ipsum",
            date: "Wczoraj 19:43",
            topicName: "Lorem Ipsum",
            avatar: "/avatars/default.jpg",
          }}
        />
        <TopicHeader title="Lorem Ipsum" />
        <TopicHeader title="Lorem Ipsum" />
      </div>
    </main>
  );
}
