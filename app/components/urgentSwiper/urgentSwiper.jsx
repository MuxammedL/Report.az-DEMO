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
function createSlug(str) {
  return str
    .toLowerCase() // convert to lowercase
    .replace(/ə/g, "e") // replace 'ə' with 'e'
    .replace(/[^\w\s-]/g, "") // remove non-word characters except spaces and hyphens
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/--+/g, "-") // replace consecutive hyphens with a single hyphen
    .trim(); // trim leading and trailing spaces and hyphens
}
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
