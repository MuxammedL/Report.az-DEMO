import { getSinglePost } from "@/app/lib/post";

export async function generateMetadata({params:{blogId}}) {
  const post = await getSinglePost(blogId);

  return {
    title: post.title.slice(0,5),
  };
}
const SinglePost = async ({ params: { blogId } }) => {
  const post = await getSinglePost(blogId);
  return (
    <>
      <h1>{blogId}</h1>
      {post && post.title}
    </>
  );
};

export default SinglePost;
