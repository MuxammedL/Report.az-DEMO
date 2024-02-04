import PostUser from "@/app/components/postUser/postUser";
import { getPost } from "@/app/lib/data";
import Image from "next/image";
import { Suspense } from "react";

export async function generateMetadata({ params: { slug } }) {
  const post = await getPost(slug);
  return {
    title: post.title,
  };
}

const SinglePost = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);
  console.log(post);
  return (
    <>
      {post && (
        <>
          <Image src={post[0].image} width={200} height={100} alt={post[0].title} />
          <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={post[0].userId} />
          </Suspense>
        </>
      )}
    </>
  );
};

export default SinglePost;
