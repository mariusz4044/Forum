import { PostsContent } from "@/app/topic/[topicId]/page";
import useSWR from "swr";
import fetcherGet from "@/functions/fetcherGet";
import Loading from "@/components/Utils/Universal/Loading";
import { PostPropsWithReports } from "@/types/types";

export default function () {
  const { isLoading, error, data } = useSWR(
    `${process.env.SERVER_URL}/api/reports`,
    fetcherGet,
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <h1>Please refresh the page!</h1>;
  }

  const postData: PostPropsWithReports[] = data;

  return (
    <div className="mb-18">
      <h1>Reported posts list:</h1>
      <PostsContent posts={postData} />
    </div>
  );
}
