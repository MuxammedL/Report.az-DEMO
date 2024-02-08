"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./_urgentSwiper.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import SwiperNavButtons from "./swiperNavButtons/swiperNavButtons";
import { createSlug, formatDate, getTimeFromISODate } from "@/app/lib/functions";

const UrgentSwiper = ({ posts }) => {
  return (
    <>
     
      <div className="breaking-news-container">
        <div className="label">
          <FontAwesomeIcon icon={faBoltLightning} />
          Təcili xəbərlər
        </div>
        <div className="breaking-news-slider">
          <Swiper
            modules={[Navigation, Scrollbar, Autoplay]}
            spaceBetween={50}
            loop={true}
            autoplay={{
              delay: 6000,
            }}
          >
            {posts.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="news-item">
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
              </SwiperSlide>
            ))}
            <SwiperNavButtons />
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default UrgentSwiper;
