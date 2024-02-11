import Link from "next/link";
import "./_Footer.scss";
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
import { getLinks } from "@/app/lib/data";
import { faMicrophone, faPodcast } from "@fortawesome/free-solid-svg-icons";
const Footer = async () => {
  const links = await getLinks();
  return (
    <>
      <footer>
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="logo">
                  <Link className="logo-dark" href="/">
                    <Image
                      src="/images/logo-dark-az.webp"
                      alt="Report İnformasiya Agentliyi"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Link>
                  <Link className="logo-light" href="/">
                    <Image
                      src="/images/logo-light-az.webp"
                      alt="Report İnformasiya Agentliyi"
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Link>
                </div>

                <div className="footer-nav">
                  <ul>
                    <li>
                      <Link href="/vacancies">Vakansiyalar</Link>
                    </li>
                    <li>
                      <Link href="/haqqimizda">Haqqımızda</Link>
                    </li>
                    <li>
                      <Link href="/elaqe">Bizimlə əlaqə</Link>
                    </li>
                    <li>
                      <Link href="#">Abunə</Link>
                    </li>
                  </ul>
                  <ul>
                    {links.slice(2).map((item) => (
                      <li>
                        <a href={`/${item.url}`}>{item.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="divider"></div>
                <div className="copyrights-wrapper">
                  <div className="copyrights">
                    <p>
                      Saytdakı materialların istifadəsi zamanı istinad edilməsi
                      vacibdir. Məlumat internet səhifələrində istifadə
                      edildikdə hiperlink vasitəsi ilə istinad mütləqdir.
                    </p>
                  </div>
                  <ul className="socials">
                    <li>
                      <Link
                        href="https://www.facebook.com/www.report.az/"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faFacebookF} />
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.instagram.com/report.az/"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faInstagram}/>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://t.me/reportnewsaz" target="_blank">
                        <FontAwesomeIcon icon={faTelegram}/>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://twitter.com/reportaznews"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faTwitter}/>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://linkedin.com/company/report-news-agency"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faLinkedinIn}/>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.youtube.com/channel/UCPSpgPJwGhr5uB0Uui8Lj8g"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faYoutube}/>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://podcasts.apple.com/az/podcast/report-news-agency/id1537561865"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faPodcast} />
                      </a>
                    </li>
                    <li>
                      <Link
                        href="https://podcasts.google.com/feed/aHR0cHM6Ly9yZXBvcnQuYXovcnNzL3BvZGNhc3QtZ29vZ2xlLw?sa=X&amp;ved=0CBAQ27cFahcKEwjw_rLFvNzsAhUAAAAAHQAAAAAQIw"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faMicrophone} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <p>
                  "Report" müstəqil informasiya agentliyi sayt və gündəlik
                  bülletenlər vasitəsi ilə Azərbaycan, rus və ingilis dillərində
                  siyasət, iqtisadiyyat, cəmiyyət, idman, mədəniyyət sahələri
                  üzrə ölkədə və dünyada baş verən ən vacib hadisələri öz
                  oxucularına operativ şəkildə çatdırır. O cümlədən, saytın
                  “Analitika” bölməsində Azərbaycanda və dünyada gedən
                  proseslərlə bağlı analitik materiallar təqdim edilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
