import { createSlug, getTimeFromISODate } from "@/app/lib/functions";
import "./_sideNews.scss";
import Link from "next/link";

const SideNews = ({ posts }) => {
  return (
    <>
      <div className="latest-news-section">
        <h2 className="section-title">
          <p>
            <Link href="/son-xeberler">Son xəbərlər</Link>
          </p>
        </h2>
        <div className="latest-news">
          {posts.slice(0, 20).map((item) => (
            <div
              className={`news-item ${item.important && "highlighted"}`}
              data-id={item.id}
              key={item.id}
            >
              <div className="time">
                <span>{getTimeFromISODate(item.date)}</span>
              </div>
              <div className="info">
                <Link
                  className="title"
                  href={`/${createSlug(item.category)}/${createSlug(item.sub_category)}/${item.slug}`}
                >
                  <span className="feed-news-title">{item.title}</span>
                </Link>
                <Link
                  className="category"
                  href={`/${createSlug(item.category)}`}
                >
                  {item.category}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="show-all">
        <Link href="/son-xeberler">Bütün xəbər lenti</Link>
      </div>
    </>
  );
};

export default SideNews;
