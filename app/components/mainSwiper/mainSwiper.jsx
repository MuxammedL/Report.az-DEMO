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
function getTimeFromISODate(isoDate) {
  // Create a new Date object from the ISO date string
  const date = new Date(isoDate);

  // Extract hours, minutes, and seconds from the Date object
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Return the formatted time string (HH:MM:SS)
  return `${hours}:${minutes}`;
}
function formatDate(isoDate) {
  const date = new Date(isoDate);

  // Define an array of month names
  const monthNames = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "İyun",
    "İyul",
    "Avqust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  // Get day, month, and year from the date object
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Format the month name using the monthNames array
  const monthName = monthNames[monthIndex];

  // Return the formatted date string
  return `${day} ${monthName}, ${year}`;
}

function createSlug(str) {
  return str
    .toLowerCase() // convert to lowercase
    .replace(/ə/g, "e") // replace 'ə' with 'e'
    .replace(/[^\w\s-]/g, "") // remove non-word characters except spaces and hyphens
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/--+/g, "-") // replace consecutive hyphens with a single hyphen
    .trim(); // trim leading and trailing spaces and hyphens
}
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
                <Image
                  src={item.image}
                  fill
                  sizes="cover"
                  alt="background"
                  style={{ objectFit: "cover" }}
                />
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
