import { PostProps, PostPropsWithReports } from "@/types/types";
import { PostBox } from "@/components/Topic/PostBox";

export default function PostsContent({
  posts,
}: {
  posts: PostProps[] | PostPropsWithReports[];
}) {
  if (!posts) return null;
  return (
    <>
      {posts.map((post: PostProps | PostPropsWithReports) => {
        return <PostBox postData={post} key={`post-${post.id}`} />;
      })}
    </>
  );
}
