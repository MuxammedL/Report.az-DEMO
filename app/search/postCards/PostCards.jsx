"use client";
import Image from "next/image";
import {
  convertFromJSON,
  convertToJSON,
  createSlug,
  formatDate,
  getTimeFromISODate,
} from "@/app/lib/functions";
import Link from "next/link";
function highlightMatchingWords(text, query) {
  const queryWords = query.toLowerCase().split(/\s+/);
  if (text) {
    text = text.replace(/\n/g, "").trim();
    const words = text.split(/\s+/);

    const highlightedText = words
      .map((word) => {
        if (
          queryWords.some((queryWord) => word.toLowerCase().includes(queryWord))
        ) {
          return `<span class="highlight">${word}</span>`;
        } else {
          return word;
        }
      })
      .join(" ");

    return highlightedText;
  }
}
function splitSentence(text, query) {
  const matchedParagraphs = [];

  // Split text into paragraphs
  const paragraphs = text.split("</p>");

  // Iterate through paragraphs
  for (let i = 0; i < paragraphs.length; i++) {
    let paragraph = paragraphs[i].trim(); // Remove leading and trailing whitespace

    // Skip empty or whitespace-only paragraphs
    if (paragraph.length === 0) {
      continue;
    }

    // Split query into words
    const queryWords = query?.toLowerCase().split(" ");

    // Check if any query word is found in the paragraph
    if (
      queryWords?.some((queryWord) =>
        paragraph.toLowerCase().includes(queryWord)
      )
    ) {
      matchedParagraphs.push(paragraph + "</p>");
      return matchedParagraphs; // Stop searching after finding the first match
    }
  }

  // If no match found and matchedParagraphs is empty, search for the first non-empty paragraph
  if (matchedParagraphs.length === 0) {
    for (let i = 0; i < paragraphs.length; i++) {
      let paragraph = paragraphs[i].trim();
      if (paragraph.length > 0) {
        matchedParagraphs.push(paragraph + "</p>");
        break;
      }
    }
  }

  return matchedParagraphs;
}

const PostCards = ({ item, query, posts }) => {
  return (
    <>
      {posts.map((item) => (
        <div
          className={`news-item ${item.important && "highlighted"}`}
          key={item.id}
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
              dangerouslySetInnerHTML={{
                __html: `${highlightMatchingWords(item.title, query)}`,
              }}
            ></Link>
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: `${highlightMatchingWords(
                  splitSentence(convertToJSON(item.text), query)[0],
                  query
                )}`,
              }}
            ></div>
            <div className="news-date">
              <span>{formatDate(item.date)}</span>
              <span>{getTimeFromISODate(item.date)}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostCards;
