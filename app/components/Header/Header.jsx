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
import "./_header.scss";

const Header = () => {
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
                          Bakı 5° C
                        </li>
                        <li>9 m/s</li>
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
                      <ul>
                        <li>USD - 1.7000</li>
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
                    <button className="switcher">
                      <FontAwesomeIcon icon={faMoon} className="social_icon" />
                      {/* <FontAwesomeIcon icon={faSun} className="social_icon" /> */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
