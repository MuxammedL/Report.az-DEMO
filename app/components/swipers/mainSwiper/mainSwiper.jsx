"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs, Navigation, FreeMode } from "swiper/modules";
import "./_mainSwiper.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  createSlug,
  formatDate,
  getTimeFromISODate,
} from "@/app/lib/functions";

const MainSwiper = ({ posts }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <div className="intro-slider">
        <Swiper
          modules={[FreeMode, Autoplay, Thumbs]}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
        >
          {posts.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="cover-center">
                <div className="bg-image">
                  <Image
                    src={item.image}
                    fill
                    sizes="cover"
                    alt="background"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="slide-news">
                <Link
                  className="news-category"
                  href={`/${createSlug(item.sub_category)}`}
                >
                  {item.sub_category}
                </Link>
                <Link
                  className="title"
                  href={`/${createSlug(item.sub_category)}/${item.slug}`}
                >
                  {item.title}
                </Link>
                <div className="news-date">
                  <span>{formatDate(item.date)}</span>
                  <span>{getTimeFromISODate(item.date)}</span>
                </div>
              </div>
              <div className="divider"></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          modules={[Navigation, FreeMode, Autoplay, Thumbs]}
          watchSlidesProgress={true}
        >
          {posts.map((item, index) => (
            <SwiperSlide key={index} className="thumbs-swiper-slide">
              <div>
                <Image
                  src={item.image}
                  alt="image"
                  priority={true}
                  fill
                  sizes="cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default MainSwiper;
