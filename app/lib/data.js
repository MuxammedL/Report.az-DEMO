import { unstable_noStore as noStore } from "next/cache";
export const getLinks = async () => {
  noStore();
  try {
    const res = await fetch("http://localhost:4000/links");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};
export const getPosts = async () => {
  noStore();
  try {
    const res = await fetch("http://localhost:4000/news");
    const data = await res.json();
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};
export const getVideos = async () => {
  try {
    const res = await fetch("http://localhost:4000/videoNews");
    return res.json();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch videos!");
  }
};
export const getPost = async (slug) => {
  noStore();
  try {
    const res = await fetch(`http://localhost:4000/news?slug=${slug}`);
    return res.json();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};
export const getSubCategories = async (subCat) => {
  try {
    const res = await fetch(
      `http://localhost:4000/news?sub_category=${subCat}`
    );
    const data = await res.json();
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch sub categories!");
  }
};
export const getUser = async (id) => {
  try {
    const res = await fetch(`http://localhost:4000/users?id=${id}`);
    return res.json();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const getValute = async () => {
  noStore();
  try {
    const res = await fetch(`http://localhost:4000/valutes`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching valute:", error.message);
  }
};

export const getWeather = async () => {
  noStore();
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=baku&appid=daf23bcd6e2a7097959c3849d264e8be&units=metric`,
      {
        next: { revalidate: 300 },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error.message);
  }
};

//-hostName
// export const getLinks = async () => {
//   try {
//     const res = await fetch("http://192.168.0.106:4000/links", {
//       cache: "no-store",
//     });
//     const data = await res.json();
//     return data;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch posts!");
//   }
// };
// export const getPosts = async () => {
//   try {
//     const res = await fetch("http://192.168.0.106:4000/news", {
//       cache: "no-store",
//     });
//     const data = await res.json();
//     data.sort((a, b) => new Date(b.date) - new Date(a.date));
//     return data;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch posts!");
//   }
// };
// export const getVideos = async () => {
//   try {
//     const res = await fetch("http://192.168.0.106:4000/videoNews");
//     return res.json();
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch videos!");
//   }
// };
// export const getPost = async (slug) => {
//   try {
//     const res = await fetch(`http://192.168.0.106:4000/news?slug=${slug}`);
//     return res.json();
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch post!");
//   }
// };
// export const getSubCategories = async (subCat) => {
//   try {
//     const res = await fetch(
//       `http://192.168.0.106:4000/news?sub_category=${subCat}`
//     );
//     const data = await res.json();
//     data.sort((a, b) => new Date(b.date) - new Date(a.date));
//     return data;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch sub categories!");
//   }
// };
// export const getUser = async (id) => {
//   try {
//     const res = await fetch(`http://192.168.0.106:4000/users?id=${id}`);
//     return res.json();
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch user!");
//   }
// };
// export const getValute = async () => {
//   noStore();
//   try {
//     const res = await fetch(`http://192.168.0.106:4000/valutes`);
//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status}`);
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching valute:", error.message);
//   }
// };