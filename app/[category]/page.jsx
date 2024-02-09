import Link from "next/link";
import { getPosts } from "../lib/data";
import { createSlug } from "../lib/functions";

const CategoryPage = async ({ params: { category } }) => {
  const posts = await getPosts();
  const links = [
    {
      title: "Son xəbərlər",
      path: "son-xeberler",
    },
  ];
  posts.forEach((post) => {
    links.push({
      title: `${post.category}`,
      path: `${createSlug(post.category)}`,
    });
  });
  const uniqueLinks = links.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.title === item.title)
  );
  const activeLink = uniqueLinks.filter((item) => item.path == category);
  return (
    <>
      <section className="new-feed-page">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="page-title">{activeLink[0]?.title}</h1>
              <div className="filters">
                <ul>
                  <li>
                    <Link href="/today">Bu gün</Link>
                  </li>
                  <li>
                    <Link href="/yesterday">Dünən</Link>
                  </li>
                  <li>
                    <Link href="/this_week">Bu həftə </Link>
                  </li>
                  <li>
                    <Link href="/this_month">Bu ay</Link>
                  </li>
                  <li>
                    <Link href="/prev_week">Keçən həftə</Link>
                  </li>
                  <li>
                    <Link href="/prev_month">Keçən ay</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;
