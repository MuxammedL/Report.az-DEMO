import Image from "next/image";
import VideoSwiper from "./components/swipers/videoSwiper/videoSwiper";
import { getLinks, getPosts, getVideos } from "./lib/data";
import "./_home.scss";
import Link from "next/link";
import SideNews from "./components/swipers/sideNews/sideNews";
import MainSwiper from "./components/swipers/mainSwiper/mainSwiper";
import UrgentSwiper from "./components/swipers/urgentSwiper/urgentSwiper";
import { createSlug, getTimeFromISODate, formatDate } from "./lib/functions";
import ImportantNewsSwiper from "./components/swipers/importantNewsSwiper/importantNewsSwiper";

export default async function Home() {
  const posts = await getPosts();
  const sortByDate = (dataArray) => {
    return dataArray
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };
  const sortedPosts = sortByDate(posts);
  const videos = await getVideos();
  const links = [];
  posts.forEach((post) => {
    links.push({
      title: `${post.category}`,
      path: `/${createSlug(post.category)}`,
    });
  });
  const uniqueLinks = links.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.title === item.title)
  );
  console.log(uniqueLinks);
  return (
    <>
      <section className="entrance">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <MainSwiper posts={sortedPosts.slice(0, 5)} />
              <div className="latest-news">
                <UrgentSwiper posts={sortedPosts.slice(0, 10)} />
              </div>
              <div className="main-news">
                <div className="actual-news-blocks">
                  {sortedPosts.slice(0, 2).map((item) => (
                    <div className="actual-news-block">
                      <div className="bg-image">
                        <Image
                          src={item.image}
                          alt={item.title}
                          title={item.title}
                          priority={true}
                          fill
                          sizes="cover"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="info">
                        <Link
                          className="news-category"
                          href={`/${item.sub_category}`}
                        >
                          {item.sub_category}
                        </Link>
                        <Link
                          className="title"
                          href={`/${createSlug(item.sub_category)}/${
                            item.slug
                          }`}
                          title={item.title}
                        >
                          <span className="feed-news-title">{item.title}</span>
                        </Link>
                        <div className="news-date">
                          <span>{formatDate(item.date)}</span>
                          <span>{getTimeFromISODate(item.date)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="small-news">
                  {sortedPosts.slice(2, 14).map((item) => (
                    <div className="small-news-item">
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
                          title={item.link}
                        >
                          {item.title.length < 74
                            ? item.title
                            : `${item.title.slice(0, 74)}...`}
                        </Link>
                        <div className="news-date">
                          <span>{formatDate(item.date)}</span>
                          <span>{getTimeFromISODate(item.date)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <ImportantNewsSwiper posts={sortedPosts} />
            </div>
            <div className="col-lg-4">
              <div className="side-news">
                {/* <VideoSwiper videos={videos} /> */}
                <SideNews posts={sortedPosts} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="other-category-news">
        <div className="container">
          <div className="row">
            {uniqueLinks.slice(0, 6).map((link) => (
              <div className="col-lg-4 col-md-6">
                <h2 className="section-title">
                  <Link
                    className="category-link"
                    href={link.path}
                    title={link.title}
                  >
                    {link.title}
                  </Link>{" "}
                </h2>
                {sortedPosts
                  .filter((item) => item.category == link.title)
                  .slice(0, 1)
                  .map((item) => (
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
                  ))}
                <div className="small-news">
                  {sortedPosts
                    .filter((item) => item.category == link.title)
                    .slice(1, 3)
                    .map((item) => (
                      <div className="small-news-item">
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
                            title={item.link}
                          >
                            {item.title.length < 74
                              ? item.title
                              : `${item.title.slice(0, 74)}...`}
                          </Link>
                          <div className="news-date">
                            <span>{formatDate(item.date)}</span>
                            <span>{getTimeFromISODate(item.date)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
