"use client";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import Profile from "../components/profile/Profile";
import { useRouter } from "next/navigation";

const Author = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    setPosts(data);
    setUser(data[0].userId);
  };
  useEffect(() => {
    if (session?.user.id) fetchPosts();
    console.log(session?.user.id)
  }, []);
  const handleEdit = (post) => {
    router.push(`/update-news?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Bu xəbəri silmək istədiyinizə əminsiniz?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/news/${post._id.toString()}`, { method: "DELETE" });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Profile
        user={user}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </Suspense>
  );
};

export default Author;
