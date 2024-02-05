import Image from "next/image";
import VideoSwiper from "./components/videoSwiper/videoSwiper";
import { getVideos } from "./lib/data";
import './_home.scss'
export default async function Home() {
  const videos = await getVideos();
  return (
    <section className="entrance">
      <div className="container">
        <div className="row">
          <div className="col-lg-8"></div>
          <div className="col-lg-4">
            <div className="side-news">
              <div className="video-news">
                <h2 className="section-title">Video xəbərlər</h2>
                <VideoSwiper videos={videos} />
              </div>
              <div className="latest-news"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
