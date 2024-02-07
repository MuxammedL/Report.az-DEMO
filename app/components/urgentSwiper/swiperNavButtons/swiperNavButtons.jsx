"use client";
import { useSwiper } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./_swiperNavButtons.scss";
const SwiperNavButtons = () => {
  const swiper = useSwiper();
  return (
    <>
      <div className="nav-buttons">
        <button className="prev-slide" onClick={() => swiper.slidePrev()}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button className="next-slide" onClick={() => swiper.slideNext()}>
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </>
  );
};

export default SwiperNavButtons;
