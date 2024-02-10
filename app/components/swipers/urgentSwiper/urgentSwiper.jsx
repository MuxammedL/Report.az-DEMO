"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./_urgentSwiper.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoltLightning,
  faAngleRight,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  createSlug,
  formatDate,
  getTimeFromISODate,
} from "@/app/lib/functions";

const UrgentSwiper = ({ posts }) => {
  return (
    <>
      <div className="breaking-news-container">
        <div className="label">
          <FontAwesomeIcon icon={faBoltLightning} />
          <span>Təcili xəbərlər</span>
        </div>
        <div className="breaking-news-slider">
          <Swiper
            modules={[Navigation, Scrollbar, Autoplay]}
            spaceBetween={50}
            loop={true}
            autoplay={{
              delay: 6000,
            }}
            navigation={{
              nextEl: ".breaking-news-slider .next-slide",
              prevEl: ".breaking-news-slider .prev-slide",
            }}
          >
            {posts.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="news-item">
                  <Link
                    className="title"
                    href={`/${createSlug(item.category)}/${createSlug(item.sub_category)}/${item.slug}`}
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
          </Swiper>
          <marquee behavior="scroll" direction="left" scrollamount="6">
            <div className="scrollingText">
              {posts.map((item) => (
                <div className="news-item" key={item.id}>
                  <div className="news-title">
                    <Link
                      href={`/${createSlug(item.category)}/${createSlug(item.sub_category)}/${item.slug}`}
                    >
                      {item.title}
                    </Link>
                  </div>
                  <div className="news-date">
                    <span>{formatDate(item.date)}</span>
                    <span>{getTimeFromISODate(item.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          </marquee>
          <div className="nav-buttons">
            <button className="prev-slide">
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button className="next-slide">
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UrgentSwiper;
