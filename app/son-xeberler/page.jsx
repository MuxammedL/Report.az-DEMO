import Link from "next/link";
import { getPosts } from "../lib/data";
import "./_latestNews.scss";
import LatestNewsPosts from "./LatestNewsPosts/LatestNewsPosts";
export async function generateMetadata() {
  return {
    title: "Son xəbərlər",
  };
}
const LatestNewsPage = async () => {
  const posts = await getPosts();
  return (
    <>
      <section className="new-feed-page pt-20">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="page-title">Son xəbərlər</h1>
              <div className="filter-links">
                <ul>
                  <li>
                    <Link href="/son-xeberler/today">Bu gün</Link>
                  </li>
                  <li>
                    <Link href="/son-xeberler/yesterday">Dünən</Link>
                  </li>
                  <li>
                    <Link href="/son-xeberler/this_week">Bu həftə </Link>
                  </li>
                  <li>
                    <Link href="/son-xeberler/this_month">Bu ay</Link>
                  </li>
                  <li>
                    <Link href="/son-xeberler/prev_week">Keçən həftə</Link>
                  </li>
                  <li>
                    <Link href="/son-xeberler/prev_month">Keçən ay</Link>
                  </li>
                </ul>
              </div>
              <div className="news-list">
                {/* {posts.map((item) => (
                  <div
                    className={`news-item ${item.important && "highlighted"}`}
                    data-id={item.id}
                    key={item.id}
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
                      >
                        {item.title}
                      </Link>
                      <div className="news-date">
                        <span>{formatDate(item.date)}</span>
                        <span>{getTimeFromISODate(item.date)}</span>
                      </div>
                    </div>
                  </div>
                ))} */}
                <LatestNewsPosts posts={posts} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestNewsPage;
