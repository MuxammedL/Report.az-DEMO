import Link from "next/link";
import { getLinks, getPosts } from "../lib/data";
import "./_categoryPage.scss";
import NotFound from "../components/NotFound/not-found";
import Posts from "./posts/posts";

export async function generateMetadata({ params: { category } }) {
  const links = await getLinks();

  const categoryLink = links.find((item) => item.url === category);
  let title;
  let subCategoryLink;
  if (!categoryLink) {
    subCategoryLink = links.find((item) =>
      item.sub_categories.some((cat) => cat.url === category)
    );
    if (subCategoryLink) {
      const subCategory = subCategoryLink.sub_categories.find(
        (cat) => cat.url === category
      );
      if (subCategory) {
        title = subCategory.title;
      }
    }
  }
  if (categoryLink) {
    return {
      title: categoryLink.title,
    };
  } else if (subCategoryLink) {
    return {
      title: title,
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
  const categoryLink = links.find((item) => item.url === category);
  let sortedPosts;
  if (categoryLink) {
    sortedPosts = posts.filter((item) => item.category === categoryLink.title);
  }
  let subCategoryLink;
  let title;
  if (!categoryLink) {
    subCategoryLink = links.find((item) =>
      item.sub_categories.some((cat) => cat.url === category)
    );
    if (subCategoryLink) {
      const subCategory = subCategoryLink.sub_categories.find(
        (cat) => cat.url === category
      );
      if (subCategory) {
        title = subCategory.title;
      }
    }
    sortedPosts = posts.filter((item) => item.sub_category === title);
  }
  return (
    <>
      {categoryLink || subCategoryLink ? (
        <section className="new-feed-page pt-20">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {categoryLink && (
                  <>
                    <h1 className="page-title">{categoryLink.title}</h1>
                    <div
                      className={`${
                        categoryLink.sub_categories.length > 0
                          ? "filter-links"
                          : ""
                      }`}
                    >
                      <ul>
                        {categoryLink.sub_categories.map((item) => (
                          <li key={item.id}>
                            <Link href={`/${item.url}`}>{item.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
                {subCategoryLink && <h1 className="page-title">{title}</h1>}
                <div className="new-list row">
                  {/* {sortedPosts.map((item) => (
                    <div
                      key={item.id}
                      className="col-lg-3 col-md-4 col-sm-6 infinity-item"
                    >
                      <div className="news-block">
                        <div className="image">
                          <Link
                            href={`/${createSlug(item.sub_category)}/${
                              item.slug
                            }`}
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
                            href={`/${createSlug(item.sub_category)}/${
                              item.slug
                            }`}
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
                  ))} */}
                  <Posts posts={sortedPosts} />
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
