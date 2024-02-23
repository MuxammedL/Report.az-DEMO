import { getPosts } from "../lib/data";
import { replaceAzerbaijaniLetters } from "../lib/functions";
import PostCards from "./postCards/PostCards";
export const generateMetadata = ({ searchParams: { query } }) => {
  return {
    title: `Axtarış nəticəsi: ${query}`,
  };
};
const Search = async ({ searchParams: { query } }) => {
  const posts = await getPosts();

  const filteredData = posts.filter((item) => {
    const title = replaceAzerbaijaniLetters(item.title.toLowerCase());
    const text = replaceAzerbaijaniLetters(item.text.toLowerCase());

    return (
      title.includes(replaceAzerbaijaniLetters(query.toLowerCase())) ||
      text.includes(replaceAzerbaijaniLetters(query.toLowerCase())) ||
      title.includes(query.toLowerCase()) ||
      text.includes(query.toLowerCase()) ||
      item.title.includes(replaceAzerbaijaniLetters(query.toLowerCase())) ||
      item.text.includes(replaceAzerbaijaniLetters(query.toLowerCase())) ||
      item.title.includes(query.toLowerCase()) ||
      item.text.includes(query.toLowerCase())
    );
  });
  return (
    <>
      <section className="search pt-20">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="heading">
                <h1 className="page-title">Açar sözü: {query}</h1>
              </div>
              <div className="news-list">
                {filteredData.length > 0 ? (
                  <PostCards posts={filteredData} query={query} />
                ) : (
                  <h2>Axtarışa uyğun nəticə tapılmadı.</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
