"use client";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import "./_goToTop.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const GoToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 650) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div
        className="to-top"
        onClick={handleClick}
        style={{ right: showButton && "40px" }}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </>
  );
};

export default GoToTop;
