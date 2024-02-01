const API_URL = "https://questions-vksc.onrender.com/valute"

export async function getValute(){
    const res = await fetch(API_URL)
    const data = await res.json()
    return data;
}