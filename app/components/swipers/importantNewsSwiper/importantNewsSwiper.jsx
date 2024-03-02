"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay, Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/navigation";
import "./_importantNewsSwiper.scss";
import Link from "next/link";
import {
  createSlug,
  formatDate,
  getTimeFromISODate,
} from "@/app/lib/functions";
import Image from "next/image";
const ImportantNewsSwiper = ({ posts }) => {
  const sortedByImportance = posts.filter((item) => item.important == true);
  return (
    <>
      <section className="important-news">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-header">
                <h3 className="section-title">Ən vacib xəbərlər</h3>
                <div className="controllers">
                  <button className="prev-slide">
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </button>
                  <button className="next-slide">
                    <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                </div>
              </div>
              <Swiper
                modules={[Navigation, Scrollbar, Autoplay]}
                breakpoints={{
                  576: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  992: { slidesPerView: 2 },
                  1200: { slidesPerView: 3 },
                }}
                spaceBetween={30}
                navigation={{
                  nextEl: ".important-news .next-slide",
                  prevEl: ".important-news .prev-slide",
                }}
              >
                {sortedByImportance.slice(0, 9).map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="counted-news">
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
                        <div className="num">
                          <span>{`0${index + 1}.`}</span>
                        </div>
                        <Link
                          className="title"
                          href={`/${createSlug(item.sub_category)}/${
                            item.slug
                          }`}
                          title={item.link}
                        >
                          {item.title}
                        </Link>
                        <div className="category-date">
                          <Link
                            className="category"
                            href={`/${item.sub_category}`}
                          >
                            {item.sub_category}
                          </Link>
                          <div className="news-date">
                            <span>{formatDate(item.date)}</span>
                            <span>{getTimeFromISODate(item.date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ImportantNewsSwiper;
