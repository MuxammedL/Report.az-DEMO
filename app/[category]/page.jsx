import Link from "next/link";
import { getLinks, getPosts } from "../lib/data";
import { createSlug, formatDate, getTimeFromISODate } from "../lib/functions";
import "./_categoryPage.scss";
import Image from "next/image";
import NotFound from "../components/NotFound/not-found";

export async function generateMetadata({ params: { category } }) {
  const links = await getLinks();
  const activeLink = links.find((item) => item.url === category);
  if (activeLink) {
    return {
      title: activeLink.title,
    };
  } else {
    return {
      title: "Yanlışlıq baş vermişdir!",
    };
  }
}
const CategoryPage = async ({ params: { category } }) => {
  const links = await getLinks();
  const posts = await getPosts();
  const activeLink = links.find((item) => item.url === category);
  let sortedPosts;
  if (activeLink) {
    sortedPosts = posts.filter((item) => item.category === activeLink.title);
  }
  return (
    <>
      {activeLink ? (
        <section className="new-feed-page pt-20">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className="page-title">{activeLink.title}</h1>
                <div
                  className={`${
                    activeLink.sub_categories.length > 0 ? "filter-links" : ""
                  }`}
                >
                  <ul>
                    {activeLink.sub_categories.map((item) => (
                      <li key={item.id}>
                        <Link href={`/${activeLink.url}/${item.url}`}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="new-list row">
                  {sortedPosts.map((item) => (
                    <div
                      key={item.id}
                      className="col-lg-3 col-md-4 col-sm-6 infinity-item"
                    >
                      <div className="news-block">
                        <div className="image">
                          <Link
                            href={`/${activeLink.url}/${createSlug(
                              item.sub_category
                            )}/${item.slug}`}
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
                            href={`/${activeLink.url}/${createSlug(
                              item.sub_category
                            )}/${item.slug}`}
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
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default CategoryPage;
