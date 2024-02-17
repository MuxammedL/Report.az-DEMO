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
  // Split the text into an array of lines
  const lines = text.split("\n");

  // Wrap each line in a <p> tag
  const paragraphs = lines.map((line) => `<p>${line.trim()}</p>`);

  // Join the paragraphs into a single string
  let formattedText = paragraphs.join("");

  // Add "Report" within the <a> tag
  formattedText = formattedText.replace(
    /"Report"/g,
    `<a href=\"#\">“Report”</a>`
  );

  // Return the formatted text as a JSON object
  return formattedText;
}
