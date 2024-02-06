import Image from "next/image";
import VideoSwiper from "./components/videoSwiper/videoSwiper";
import { getPosts, getVideos } from "./lib/data";
import "./_home.scss";
import "./utilities.css"
import Link from "next/link";
import SideNews from "./components/sideNews/sideNews";


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
          <div className="col-lg-8"></div>
          <div className="col-lg-4">
            <div className="side-news">
                <VideoSwiper videos={videos} />
                <SideNews posts={sortedPosts}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
