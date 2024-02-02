import Link from "next/link";
import { getPosts } from "../lib/post";


const Blogs = async () => {
  const posts = await getPosts();

  return (
    <main>
      <h1>Blogsss..</h1>
      {posts
        ? posts.map((post) => (
            <>
              <p className="text-2xl">{post.title}</p>
              <Link href={`blogs/${post.id}`} className="text-3xl text-red-800">
                Read More
              </Link>
            </>
          ))
        : "Loading..."}
    </main>
  );
};

export default Blogs;
