"use client";

import Profile from "@/app/components/profile/Profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = ({ params }) => {
  const [userPosts, setUserPosts] = useState([]);
  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setUser(data[0].userId);
      setUserPosts(data);
    };
    if (params?.id) fetchPosts();
  }, []);

  return (
    <Profile
      user={user}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
