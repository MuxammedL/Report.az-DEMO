import Link from "next/link";
import Muxammed from "@/app/muxammed/page";
import "./_header.scss";
const Header = () => {
  return (
    <>
      <header>
        <nav>
          <ul id="nav-social" className="navbar-bg">
            <li>
              <Link href="/muxammed" className="link">
                <img src="https://report.az/public/images/logo-victory-az.png" alt="logo.svg" />
              </Link>
            </li>
            <li>
              <div className="contact">
                <span>zəng et</span>
                <a href="tel:*7606">*7606</a>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
