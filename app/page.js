import Image from "next/image";
import VideoSwiper from "./components/videoSwiper/videoSwiper";
import { getPosts, getVideos } from "./lib/data";
import "./_home.scss";
import Link from "next/link";
import SideNews from "./components/sideNews/sideNews";
import MainSwiper from "./components/mainSwiper/mainSwiper";
import UrgentSwiper from "./components/urgentSwiper/urgentSwiper";

export default async function Home() {
  const posts = await getPosts();
  const sortByDate = (dataArray) => {
    return dataArray
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  //  Usage example
  const sortedPosts = sortByDate(posts);
  const videos = await getVideos();
  return (
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
                        data-cfsrc="https://static.report.az/photo/thunk_400.jpg"
                        alt="Nurəddin Mehdixanlı: Azərbaycan xalqı dövlətini dünyada söz sahibi edən liderini seçdi"
                        title="Nurəddin Mehdixanlı: Azərbaycan xalqı dövlətini dünyada söz sahibi edən liderini seçdi"
                        src="https://static.report.az/photo/5b8a2d40-5b8d-3396-bfac-f501d42f74b3_490.jpg"
                        fill
                      />
                    </div>
                    <div className="info flex">
                      <a className="news-category" href="/daxili-siyaset/">
                        Daxili siyasət
                      </a>
                      <a
                        className="title"
                        href="/daxili-siyaset/xalq-artisti-azerbaycan-xalqi-dovletini-dunyada-soz-sahibi-eden-liderini-secdi/"
                        title="Nurəddin Mehdixanlı: Azərbaycan xalqı dövlətini dünyada söz sahibi edən liderini seçdi"
                      >
                        <span className="feed-news-title">
                          Nurəddin Mehdixanlı: "Azərbaycan xalqı dövlətini
                          dünyada söz sahibi edən liderini seçdi"
                        </span>{" "}
                      </a>
                      <div className="news-date">
                        <span>7 Fevral , 2024</span>
                        <span>22:51</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
  );
}
