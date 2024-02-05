"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y } from "swiper/modules";
import styles from "./_videoSwiper.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const VideoSwiper = ({ videos }) => {
  return (
    <Swiper
      modules={[Pagination, Scrollbar, A11y]}
      pagination={{ clickable: true }}
      spaceBetween={50}
    >
      {videos.map((item, index) => (
        <SwiperSlide key={index}>
          <div
            className={styles.container}
            dangerouslySetInnerHTML={{
              __html: item.src,
            }}
          ></div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VideoSwiper;
