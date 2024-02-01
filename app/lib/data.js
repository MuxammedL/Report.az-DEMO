export async function getWeather() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=baku&appid=daf23bcd6e2a7097959c3849d264e8be&units=metric`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
export async function getValute() {
  try {
    const res = await fetch(`https://questions-vksc.onrender.com/valute`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
