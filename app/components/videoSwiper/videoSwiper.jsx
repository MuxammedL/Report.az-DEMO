"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "./_videoSwiper.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const VideoSwiper = ({ videos, isDarkMode }) => {
  return (
    <div className="video-news">
      <h2 className="section-title">Video xəbərlər</h2>
      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={50}
        loop={true}
        autoplay={{
          delay: 8000,
        }}
        className="swiper"
      >
        {videos.map((item, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div
              className="video-container"
              dangerouslySetInnerHTML={{
                __html: item.src,
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoSwiper;
