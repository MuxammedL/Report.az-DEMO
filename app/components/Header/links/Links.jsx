"use client";
import { getPosts } from "@/app/lib/data";
import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  {
    title: "Əsas xəbərlər",
    path: "/",
  },
  {
    title: "Son xəbərlər",
    path: "/latest-news",
  },
];
function createSlug(str) {
  return str
    .toLowerCase() // convert to lowercase
    .replace(/ə/g, "e") // replace 'ə' with 'e'
    .replace(/[^\w\s-]/g, "") // remove non-word characters except spaces and hyphens
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/--+/g, "-") // replace consecutive hyphens with a single hyphen
    .trim(); // trim leading and trailing spaces and hyphens
}

const Links = () => {
  const [posts, setPosts] = useState();
  const [uniqueLinks, setUniqueLinks] = useState();
  async function getPosts() {
    try {
      const res = await fetch("http://localhost:4000/news");
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
  useEffect(() => {
    posts &&
      posts.forEach((post) => {
        links.push({
          title: `${post.category}`,
          path: `/${createSlug(post.category)}`,
        });
      });
    setUniqueLinks(
      links.filter(
        (item, index, self) =>
          index === self.findIndex((i) => i.title === item.title)
      )
    );
  }, [posts]);
  return (
    <>
      {uniqueLinks &&
        uniqueLinks.map((link) => (
          <li key={link.path}>
            <Link href={link.path}>{link.title}</Link>
          </li>
        ))}
    </>
  );
};

export default Links;
