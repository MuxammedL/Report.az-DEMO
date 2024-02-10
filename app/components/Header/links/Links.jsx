"use client";
import { getPosts } from "@/app/lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";

const Links = () => {
  const [posts, setPosts] = useState();
  async function getPosts() {
    try {
      const res = await fetch("http://localhost:4000/links");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch posts!");
    }
  }
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      {posts &&
        posts.map((link) => (
          <li key={link.url}>
            <Link href={`/${link.url}`}>{link.title}</Link>
          </li>
        ))}
    </>
  );
};

export default Links;
