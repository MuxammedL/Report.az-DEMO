import "./_sideNews.scss";
import Link from "next/link";

function getTimeFromISODate(isoDate) {
  // Create a new Date object from the ISO date string
  const date = new Date(isoDate);

  // Extract hours, minutes, and seconds from the Date object
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Return the formatted time string (HH:MM:SS)
  return `${hours}:${minutes}`;
}
const SideNews = ({ posts }) => {
  return (
    <>
      <div className="latest-news-section">
        <h2 className="section-title">
          <p>
            <Link href="/son-xeberler">Son xəbərlər</Link>
          </p>
        </h2>
        <div className="latest-news">
          {posts.slice(0, 20).map((item) => (
            <div
              className={`news-item ${item.important && "highlighted"}`}
              data-id={item.id}
              key={item.id}
            >
              <div className="time">
                <span>{getTimeFromISODate(item.date)}</span>
              </div>
              <div className="info">
                <Link
                  className="title"
                  href="/komanda/hendbol-uzre-azerbaycan-cempionati-lider-en-yaxin-izleyicisi-ile-qarsilasacaq/"
                >
                  <span className="feed-news-title">{item.title}</span>
                </Link>
                <Link className="category" href="/komanda">
                  {item.category}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="show-all">
        <Link href="/son-xeberler">Bütün xəbər lenti</Link>
      </div>
    </>
  );
};

export default SideNews;
