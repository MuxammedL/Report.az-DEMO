"use client";
import Image from "next/image";
import {
  convertToJSON,
  createSlug,
  formatDate,
  getTimeFromISODate,
  highlightMatchingWords,
  splitSentence,
} from "@/app/lib/functions";
import Link from "next/link";
import { useEffect, useState } from "react";

const PostCards = ({ query, posts }) => {
  const [postsCount, setPostsCount] = useState(10);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPostsCount((prev) => prev + 10);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {posts.slice(0, postsCount).map((item) => (
        <div
          className={`news-item ${item.important && "highlighted"}`}
          key={item.id}
          data-id={item.id}
        >
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
              dangerouslySetInnerHTML={{
                __html: `${highlightMatchingWords(item.title, query)}`,
              }}
            ></Link>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: `${highlightMatchingWords(
                  splitSentence(convertToJSON(item.text), query)[0],
                  query
                )}`,
              }}
            ></div>
            <div className="news-date">
              <span>{formatDate(item.date)}</span>
              <span>{getTimeFromISODate(item.date)}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostCards;
