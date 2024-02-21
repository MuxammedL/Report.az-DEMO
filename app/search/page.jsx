import { getPosts } from "../lib/data";
import PostCards from "./postCards/PostCards";
export const generateMetadata = ({ searchParams: { query } }) => {
  return {
    title: `Axtarış nəticəsi: ${query}`,
  };
};
const Search = async ({ searchParams: { query } }) => {
  const posts = await getPosts();
  function replaceAzerbaijaniLetters(text) {
    const replacements = {
      ə: "e",
      ç: "c",
      ş: "s",
      ü: "u",
      ö: "o",
      ğ: "g",
      ı: "i",
    };

    return text.replace(/[əçşüöğıı]/g, (letter) => replacements[letter]);
  }

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
                <PostCards posts={filteredData} query={query} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
