export function createSlug(text) {
  // Azerbaijani characters and their corresponding replacements
  const azChars = {
    ə: "e",
    ç: "c",
    ə: "e",
    ğ: "g",
    ı: "i",
    ö: "o",
    ş: "s",
    ü: "u",
    Ç: "C",
    Ə: "E",
    Ğ: "G",
    I: "I",
    İ: "I",
    Ö: "O",
    Ş: "S",
    Ü: "U",
  };

  // Replace Azerbaijani characters with their equivalents
  const slug = text
    .replace(/[əçğıöşüÇƏĞIİÖŞÜ]/g, (char) => azChars[char] || char)
    // Remove non-word characters
    .replace(/[^\w\s-]/g, "")
    // Replace spaces with dashes
    .replace(/\s+/g, "-")
    // Remove extra dashes
    .replace(/--+/g, "-")
    // Trim dashes from start and end
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    // Convert to lowercase
    .toLowerCase();

  return slug;
}
export function formatDate(isoDate) {
  const date = new Date(isoDate);

  // Define an array of month names
  const monthNames = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "İyun",
    "İyul",
    "Avqust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  // Get day, month, and year from the date object
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Format the month name using the monthNames array
  const monthName = monthNames[monthIndex];

  // Return the formatted date string
  return `${day} ${monthName}, ${year}`;
}
export function getTimeFromISODate(isoDate) {
  // Create a new Date object from the ISO date string
  const date = new Date(isoDate);

  // Extract hours, minutes, and seconds from the Date object
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Return the formatted time string (HH:MM:SS)
  return `${hours}:${minutes}`;
}
export function convertToJSON(text) {
  const lines = text.split("\n");

  const paragraphs = lines.map((line) => `<p>${line.trim()}</p>`);

  let formattedText = paragraphs.join("");

  formattedText = formattedText.replace(
    /“Report”/g,
    `<a href=\"/\">“Report”</a>`
  );
  formattedText = formattedText.replace(
    /"Report"/g,
    `<a href=\"/\">“Report”</a>`
  );
  formattedText = formattedText.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
  formattedText = formattedText.replace(/\_(.*?)\_/g, "<em>$1</em>");
  formattedText = formattedText.replace(
    /\@!(.*?)\@/g,
    "<span style='color:red'>$1</span>"
  );
  return formattedText;
}
export function convertFromJSON(json) {
  const text = json;

  const regex = /<p>(.*?)<\/p>|<a[^>]*>(.*?)<\/a>/g;

  const extractedText = [];

  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      extractedText.push(match[1]);
    } else if (match[2]) {
      extractedText.push(match[2]);
    }
  }
  const plainText = extractedText.join("\n");

  return plainText;
}
export function replaceAzerbaijaniLetters(text) {
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
