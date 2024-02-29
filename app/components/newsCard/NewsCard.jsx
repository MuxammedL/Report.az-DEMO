"use client";
import Link from "next/link";
import { createSlug, formatDate, getTimeFromISODate } from "../../lib/functions";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "./_newsCard.scss"
const NewsCard = ({ post, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 infinity-item">
      <div className="news-block">
        <div className="image">
          <Link
            href={`/${createSlug(post.sub_category)}/${post.slug}`}
            className="image-link"
          >
            <Image
              src={post.image}
              alt={post.title}
              title={post.title}
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
            href={`/${createSlug(post.sub_category)}/${post.slug}`}
            title={post.title}
          >
            {post.title}
          </Link>
          <div className="news-date">
            <span>{formatDate(post.date)}</span>
            <span>{getTimeFromISODate(post.date)}</span>
          </div>
        </div>
      </div>
      {session?.user.id === post.userId._id && pathName === "/author" && (
        <div className="card-buttons">
          <button type="button"
            className="black_btn"
            onClick={handleEdit}
          >
            Düzəliş et
          </button>
          <button type="button"
            className="outline_btn"
            onClick={handleDelete}
          >
            Sil
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsCard;
