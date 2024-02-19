import { getPosts } from "@/app/lib/data";
import Link from "next/link";
import "../_latestNews.scss";
import LatestNewsPosts from "../LatestNewsPosts/LatestNewsPosts";
export async function generateMetadata() {
  return {
    title: "Son xəbərlər",
  };
}
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
        const currentDate = new Date();
        const currentDayOfWeek = currentDate.getDay();
        const firstDayOfWeek = new Date(currentDate);
        firstDayOfWeek.setDate(currentDate.getDate() - currentDayOfWeek); // Set to first day of the current week (Sunday)

        const lastDayOfWeek = new Date(currentDate);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6); // Set to last day of the current week (Saturday)

        // Adjust for timezone offset
        const offset = firstDayOfWeek.getTimezoneOffset();
        firstDayOfWeek.setMinutes(firstDayOfWeek.getMinutes() - offset);
        lastDayOfWeek.setMinutes(lastDayOfWeek.getMinutes() - offset);

        const filteredData = data.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= firstDayOfWeek && itemDate <= lastDayOfWeek;
        });

        return filteredData;
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
    case "prev_week":
      function filterDataByLastWeek(data) {
        // Get today's date
        const today = new Date();
        // Get the start and end dates for the previous week
        const prevWeekStartDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay() - 6
        );
        const prevWeekEndDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay() - 1
        );

        // Filter data based on dates
        const filteredData = data.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= prevWeekStartDate && itemDate <= prevWeekEndDate;
        });

        return filteredData;
      }
      filteredData = filterDataByLastWeek(posts);
      break;
    case "prev_month":
      function filterDataByLastMonth(data) {
        const currentDate = new Date();
        const lastMonthStartDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          1
        );
        const lastMonthEndDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );

        return data.filter((item) => {
          const itemDate = new Date(item.date);
          return itemDate >= lastMonthStartDate && itemDate <= lastMonthEndDate;
        });
      }
      filteredData = filterDataByLastMonth(posts);
      break;
    default:
      filteredData = posts;
      break;
  }
  return (
    <>
      <section className="new-feed-page pt-20">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="page-title">Son xəbərlər</h1>
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
                <LatestNewsPosts posts={filteredData} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FilterDatePage;
