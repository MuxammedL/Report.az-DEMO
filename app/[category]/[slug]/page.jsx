import PostUser from "@/app/components/postUser/postUser";
import SideNews from "@/app/components/sideNews/sideNews";
import { getPost } from "@/app/lib/data";
import { createSlug, formatDate, getTimeFromISODate } from "@/app/lib/functions";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTelegram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import "./_singlePage.scss";
import NotFound from "@/app/components/NotFound/not-found";
export async function generateMetadata({ params: { slug } }) {
  const post = await getPost(slug);
  if (post.length > 0) {
    const [item] = post;
    return {
      title: item.title,
    };
  } else {
    return {
      title: "Yanlışlıq baş vermişdir!",
    };
  }
}

const SinglePost = async ({ params }) => {
  const { slug } = params;
  const post = await getPost(slug);
  const [item] = post;
  return (
    <>
      {item ? (
        <section className="news-inner-page pt-20">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="news-wrapper">
                  <div className="selected-news">
                    <h1 className="news-title">{item.title}</h1>
                    <div className="category-date">
                      <Link
                        className="news-category"
                        href={`/${createSlug(item.sub_category)}`}
                      >
                        {item.sub_category}
                      </Link>
                      <div className="news-date">
                        <span>
                          <FontAwesomeIcon
                            icon={faCalendar}
                            width={13.3}
                            height={14}
                          />
                          {formatDate(item.date)}
                        </span>
                        <span>{getTimeFromISODate(item.date)}</span>
                      </div>
                    </div>
                    <div className="news-cover">
                      <div className="image">
                        <Image
                          src={item.image}
                          alt={item.title}
                          title={item.title}
                          width="0"
                          height="0"
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    </div>
                    <div
                      className="editor-text"
                      dangerouslySetInnerHTML={{ __html: `${item.text}` }}
                    ></div>
                    <div className="subs-in-social subs-whatsapp">
                      <Link
                        href="https://whatsapp.com/channel/0029VaAQDGG1NCrLqDCPr31x"
                        target="_blank"
                      >
                        <div className="icon">
                          <FontAwesomeIcon
                            icon={faWhatsapp}
                            width={24}
                            height={26}
                          />
                        </div>
                        <div className="subs-message">
                          Bizim WhatsApp kanalımıza abunə olun
                        </div>
                      </Link>
                    </div>
                    <div className="news-tags"></div>
                    <div className="share-container">
                      <ul className="share-icons">
                        <li>
                          <Link
                            className="btn-facebook"
                            href="https://www.facebook.com/sharer.php?u=https://report.az/region-xeberleri/abs-konqresi-turkiyeye-f-16-larin-satisi-ile-bagli-muqavileni-tesdiqleyib/"
                            target="_blank"
                          >
                            <FontAwesomeIcon icon={faFacebookF} />
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="btn-whatsapp"
                            href="https://api.whatsapp.com/send?text=https://report.az/region-xeberleri/abs-konqresi-turkiyeye-f-16-larin-satisi-ile-bagli-muqavileni-tesdiqleyib/"
                            data-dialog=""
                            target="_blank"
                          >
                            <FontAwesomeIcon icon={faWhatsapp} />
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="btn-telegram"
                            href="https://telegram.me/share/url?url=https://report.az/region-xeberleri/abs-konqresi-turkiyeye-f-16-larin-satisi-ile-bagli-muqavileni-tesdiqleyib/"
                            target="_blank"
                          >
                            <FontAwesomeIcon icon={faTelegram} />
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="btn-twitter"
                            href="https://twitter.com/share?url=https://report.az/region-xeberleri/abs-konqresi-turkiyeye-f-16-larin-satisi-ile-bagli-muqavileni-tesdiqleyib/"
                            target="_blank"
                          >
                            <FontAwesomeIcon icon={faTwitter} />
                          </Link>
                        </li>
                      </ul>
                      <Suspense fallback={<div>Loading...</div>}>
                        <PostUser userId={item.userId} />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <SideNews />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default SinglePost;
