import { getPosts } from "@/app/lib/data";
import {
  createSlug,
  formatDate,
  getTimeFromISODate,
} from "@/app/lib/functions";
import Image from "next/image";
import Link from "next/link";
import "../_latestNews.scss";
const FilterDatePage = async ({ params: { filterDate } }) => {
  const posts = await getPosts();
  let filteredData = [];
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  switch (filterDate) {
    case "today":
      filteredData = posts.filter(function (item) {
        let itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === today.getTime();
      });
      break;
    case "yesterday":
      today.setDate(today.getDate() - 1);
      filteredData = posts.filter(function (item) {
        let itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === today.getTime();
      });
      break;
    case "this_week":
      function filterDataForThisWeek(data) {
        const today = new Date();
        const currentDayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - currentDayOfWeek); // Setting start of the week to Sunday
        startOfWeek.setHours(0, 0, 0, 0); // Set hours to 00:00:00
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7); // Adding 7 days to get the end of the week

        return data.filter((item) => {
          const itemDate = new Date(item.date); // Parsing ISO date string to Date object
          return itemDate >= startOfWeek && itemDate < endOfWeek;
        });
      }
      filteredData = filterDataForThisWeek(posts);
      break;
    case "this_month":
      function filterDataByCurrentMonth(data) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const filteredData = data.filter((item) => {
          const itemDate = new Date(item.date);
          const itemMonth = itemDate.getMonth() + 1;
          return itemMonth === currentMonth;
        });

        return filteredData;
      }
      filteredData = filterDataByCurrentMonth(posts);
      break;
    default:
      console.log("salame");

      break;
  }

  return (
    <>
      <section className="new-feed-page pt-20">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="page-title">Son xəbərlər {filterDate}</h1>
              <div className="filter-links">
                <ul>
                  <li>
                    <Link href="/son-xeberler/today">Bu gün</Link>
                  </li>
                  <li>
                    <Link href="/son-xeberler/yesterday">Dünən</Link>
                  </li>
                  <li>
                    <Link href="/son-xeberler/this_week">Bu həftə </Link>
                  </li>
                  <li>
                    <Link href="/son-xeberler/this_month">Bu ay</Link>
                  </li>
                  <li>
                    <Link href="/son-xeberler/prev_week">Keçən həftə</Link>
                  </li>
                  <li>
                    <Link href="/son-xeberler/prev_month">Keçən ay</Link>
                  </li>
                </ul>
              </div>
              <div className="news-list">
                {filteredData.map((item) => (
                  <div
                    className={`news-item ${item.important && "highlighted"}`}
                    data-id={item.id}
                  >
                    <div className="image">
                      <Link
                        href={`/${createSlug(item.sub_category)}/${item.slug}`}
                        className="image-link"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          title={item.title}
                          width="0"
                          height="0"
                          sizes="100vw"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </Link>
                    </div>
                    <div className="info">
                      <Link
                        className="title"
                        href={`/${createSlug(item.sub_category)}/${item.slug}`}
                        title={item.title}
                      >
                        {item.title}
                      </Link>
                      <div className="news-date">
                        <span>{formatDate(item.date)}</span>
                        <span>{getTimeFromISODate(item.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FilterDatePage;
