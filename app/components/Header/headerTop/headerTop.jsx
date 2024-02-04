"use client";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTelegram,
  faInstagram,
  faTwitter,
  faFacebookF,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

import { useEffect, useState, useRef } from "react";
const HeaderTop = ({ setIsDarkMode }) => {
  const [windSpeed, setWindSpeed] = useState();
  const [celsius, setCelsius] = useState();
  const [valute, setValute] = useState();
  const [isDarkMode, setDarkMode] = useState(false);
  const switchBTN = useRef();
  const [currentValuteIndex, setCurrentValuteIndex] = useState(0);
  
  async function getValute() {
    try {
      const res = await fetch(`https://questions-vksc.onrender.com/valute`, {
        next: { revalidate: 300 },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setValute(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  async function getWeather() {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=baku&appid=daf23bcd6e2a7097959c3849d264e8be&units=metric`,
      {
        next: { revalidate: 300 },
      }
    );
    const data = await res.json();
    setCelsius(Math.round(data.main.temp));
    setWindSpeed(Math.round(data.wind.speed));
  }

  const handleThemeSwitch = (e) => {
    setDarkMode((prev) => !prev);
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    getWeather();
    getValute();
    setIsClient(true);
    const langs = document.querySelectorAll(".langs li a");
    langs.forEach((lang) => {
      lang.addEventListener("click", () => {
        document.querySelector(".langs li a.active").classList.remove("active");
        lang.classList.add("active");
      });
    });
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    isDarkMode
      ? body.classList.add("darkMode")
      : body.classList.remove("darkMode");
  }, [isDarkMode]);

  useEffect(() => {
    const valutes = document.querySelectorAll(".valutes li");
    valutes.forEach((el, index) => {
      el.style.display = index === currentValuteIndex ? "block" : "none";
    });
  }, [valute]);

  useEffect(() => {
    const valutes = document.querySelectorAll(".valutes li");
    const totalValutes = valutes.length;

    const intervalId = setInterval(() => {
      valutes.forEach((el, index) => {
        const shouldBeVisible = index === currentValuteIndex;
        el.style.display = shouldBeVisible ? "block" : "none";
        el.style.animation = shouldBeVisible ? "goDown 1s" : "none";
      });

      setCurrentValuteIndex((prevIndex) => (prevIndex + 1) % totalValutes);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentValuteIndex, valute]);

  return (
    <div className="header-top">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="left">
              <div className="weather">
                <Link href="#">
                  <ul>
                    <li>
                      <Image
                        src="/images/weather.png"
                        width={18}
                        height={19}
                        alt="weather_pic"
                      />
                      Bakı {celsius}° C
                    </li>
                    <li>{windSpeed} m/s</li>
                  </ul>
                </Link>
              </div>
              <div className="currency">
                <Link href="#">
                  <Image
                    src="/images/currency.png"
                    width={19}
                    height={19}
                    alt="currency_pic"
                  />
                  <ul className="valutes">
                    {valute &&
                      Object.entries(valute).map(([currency, value]) => (
                        <li key={currency}>{`${currency} - ${value}`}</li>
                      ))}
                  </ul>
                </Link>
              </div>
            </div>
            <div className="right">
              <div className="static-links">
                <Link href="https://github.com/MuxammedL">Haqqimda</Link>
              </div>
              <ul className="socials">
                <li>
                  <Link
                    href="https://www.facebook.com/www.report.az/"
                    target="_blank"
                  >
                    <div className="icon">
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className="social_icon"
                      />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/report.az/"
                    target="_blank"
                  >
                    <div className="icon">
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="social_icon"
                      />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="https://t.me/reportnewsaz" target="_blank">
                    <div className="icon">
                      <FontAwesomeIcon
                        icon={faTelegram}
                        className="social_icon"
                      />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com/reportnewsaz" target="_blank">
                    <div className="icon">
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="social_icon"
                      />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://linkedin.com/company/report-news-agency"
                    target="_blank"
                  >
                    <div className="icon">
                      <FontAwesomeIcon
                        icon={faLinkedinIn}
                        className="social_icon"
                      />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/channel/UCPSpgPJwGhr5uB0Uui8Lj8g"
                    target="_blank"
                  >
                    <div className="icon">
                      <FontAwesomeIcon
                        icon={faYoutube}
                        className="social_icon"
                      />
                    </div>
                  </Link>
                </li>
              </ul>
              <div className="theme-switch">
                <button
                  className="switcher"
                  ref={switchBTN}
                  onClick={handleThemeSwitch}
                >
                  {isDarkMode ? (
                    <FontAwesomeIcon icon={faSun} className="social_icon" />
                  ) : (
                    <FontAwesomeIcon icon={faMoon} className="social_icon" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
