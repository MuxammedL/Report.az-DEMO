import { getPosts } from "../libs/post";

const Blogs = async () => {
  const posts = await getPosts();

  return (
    <>
      <h1>Blogsss..</h1>
      {posts
        ? posts.map((post) => <p className="text-2xl">{post.title}</p>)
        : "Loading..."}
    </>
  );
};

export default Blogs;
