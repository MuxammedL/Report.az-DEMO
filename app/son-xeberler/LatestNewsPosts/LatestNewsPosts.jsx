"use client";
import {
  createSlug,
  formatDate,
  getTimeFromISODate,
} from "@/app/lib/functions";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faEllipsisVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const LatestNewsPosts = ({ posts }) => {
  const [postsCount, setPostsCount] = useState(20);
  const [seleceted, setSelected] = useState(null);

  const editNews = () => {};
  const deleteNews = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/news/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };
  const handleClick = (i) => {
    if (seleceted == i) {
      return setSelected(null);
    }
    setSelected(i);
  };
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
  }, []);
  return (
    <>
      {posts?.slice(0, postsCount).map((item, i) => (
        <div
          className={`news-item ${item.important && "highlighted"}`}
          key={item.id}
          data-id={item.id}
        >
          <div className="image">
            <Link
              href={`/${createSlug(item.sub_category)}/${item.slug}`}
              rel="noopener noreferrer"
              target="_blank"
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
              rel="noopener noreferrer"
              target="_blank"
            >
              {item.title}
            </Link>
            <div className="news-date">
              <span>{formatDate(item.date)}</span>
              <span>{getTimeFromISODate(item.date)}</span>
            </div>
          </div>
          <div className="edit-delete">
            <button className="ellipsis" onClick={() => handleClick(i)}>
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            <div className={`buttons ${seleceted == i ? "show" : ""}`}>
              <button className="edit-btn" onClick={editNews}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteNews(item.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default LatestNewsPosts;
