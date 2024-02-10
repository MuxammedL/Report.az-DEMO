import { getLinks, getSubCategories } from "@/app/lib/data";
import {
  createSlug,
  formatDate,
  getTimeFromISODate,
} from "@/app/lib/functions";
import Image from "next/image";
import Link from "next/link";

const SubCategoryPage = async ({ params }) => {
  const { subCat } = params;
  const links = await getLinks();
  const activeLink = links.filter((item) =>
    item.sub_categories.some((cat) => {
      return cat.url === subCat;
    })
  );
  let title;
  activeLink[0].sub_categories.map((item) => {
    if (item.url == subCat) {
      title = item.title;
    }
  });
  const posts = await getSubCategories(title);
  return (
    <>
      <div className="category-page pt-20">
        <div className="container">
          <h1 className="page-title">{title}</h1>
          <div className="news-list">
            <div className="row">
              {posts.map((item) => (
                <div className="col-lg-3 col-md-4 col-sm-6 infinity-item">
                  <div className="news-block">
                    <div className="image">
                      <Link
                        href={`/${activeLink[0].url}/${createSlug(
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
                        href={`/${activeLink[0].url}/${createSlug(
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
    </>
  );
};

export default SubCategoryPage;
