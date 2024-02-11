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
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./_header.scss";
import { useEffect, useState, useRef } from "react";
import Links from "./links/Links";

const Header = () => {
  const [windSpeed, setWindSpeed] = useState();
  const [celsius, setCelsius] = useState();
  const [valute, setValute] = useState();
  const [isDarkMode, setDarkMode] = useState(false);
  const [isClickedMenu, setClickedMenu] = useState(false);
  const switchBTN = useRef();
  const [currentValuteIndex, setCurrentValuteIndex] = useState(0);
  const [isSearching, setSearching] = useState(false);
  async function getValute() {
    try {
      const res = await fetch(`http://localhost:4000/valutes`, {
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
  const toggleDarkMode = () => {
    localStorage.setItem("darkMode", isDarkMode ? "light" : "dark");
    const body = document.querySelector("body");
    isDarkMode
      ? body.classList.add("darkMode")
      : body.classList.remove("darkMode");
  };
  const handleThemeSwitch = (e) => {
    setDarkMode(!isDarkMode);
    toggleDarkMode();
  };

  const handleMenuToggle = () => {
    setClickedMenu((prev) => !prev);
  };
  const handleSearchClick = () => {
    setSearching((prev) => !prev);
  };
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode) {
      setDarkMode(storedDarkMode === "dark");
    } else {
      // If no preference is stored, check user's system preference
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDarkMode);
      localStorage.setItem("darkMode", prefersDarkMode ? "dark" : "light");
    }
    getWeather();
    getValute();
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
    <>
      <header>
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
                    <Link href="/haqqimizda">Haqqimizda</Link>
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
                      <Link
                        href="https://twitter.com/reportnewsaz"
                        target="_blank"
                      >
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
                        <FontAwesomeIcon
                          icon={faMoon}
                          className="social_icon"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="logo-langs">
                  <div
                    className={`menu-toggler ${isClickedMenu && "active"}`}
                    onClick={handleMenuToggle}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <ul className="langs">
                    <li>
                      <a className="active" href="#">
                        Azərbaycanca
                      </a>
                    </li>
                    <li>
                      <a href="#">Русский </a>
                    </li>
                    <li>
                      <a href="#">English </a>
                    </li>
                  </ul>
                  <div className="logo">
                    <Link href="/">
                      {isDarkMode ? (
                        <Image
                          src="/images/logo-light-az.webp"
                          width={280}
                          height={65}
                          alt="logo"
                        />
                      ) : (
                        <Image
                          src="/images/logo-dark-az.webp"
                          width={280}
                          height={65}
                          alt="logo"
                        />
                      )}
                    </Link>
                  </div>
                </div>
                <nav className="navbar">
                  <ul>
                    <Links />
                  </ul>
                  <div className="search-icon" onClick={handleSearchClick}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </div>
                  <div className={`search-block ${isSearching ? "show" : ""}`}>
                    <div className="search-block-inner">
                      <input
                        name="query"
                        type="text"
                        placeholder="Açar sözü daxil edin"
                        required=""
                      />
                    </div>
                    <div className="close-search" onClick={handleSearchClick}>
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className={`side-menu ${isClickedMenu ? "show" : ""}`}>
          <ul className="mobile-menu">
            <Links />
          </ul>
          <div className="mobile-search">
            <div className="mobile-search-inner">
              <input
                name="query"
                type="text"
                placeholder="Açar sözü daxil edin"
                required=""
              />
            </div>
          </div>
        </div>
      </header>
      <div className={`content-overlay ${isClickedMenu ? "show" : ""}`}></div>
    </>
  );
};

export default Header;
