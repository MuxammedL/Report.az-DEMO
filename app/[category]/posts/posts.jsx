"use client";
import {
  createSlug,
  formatDate,
  getTimeFromISODate,
} from "@/app/lib/functions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const Posts = ({ posts }) => {
  const [postsCount, setPostsCount] = useState(20);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPostsCount((prev) => prev + 20);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });
  return (
    <>
      {posts?.slice(0, postsCount).map((item) => (
        <div key={item.id} className="col-lg-3 col-md-4 col-sm-6 infinity-item">
          <div className="news-block">
            <div className="image">
              <Link
                href={`/${createSlug(item.sub_category)}/${item.slug}`}
                className="image-link"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  title={item.title}
                  width="0"
                  height="0"
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </Link>
            </div>
            <div className="info">
              <Link
                className="title"
                href={`/${createSlug(item.sub_category)}/${item.slug}`}
                title={item.title}
              >
                {item.title}
              </Link>
              <div className="news-date">
                <span>{formatDate(item.date)}</span>
                <span>{getTimeFromISODate(item.date)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
