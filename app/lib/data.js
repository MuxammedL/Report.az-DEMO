import { connectToDb } from "./utils";
import { News, User, Valute } from "./models";
export const getLinks = async () => {
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
    const res = await fetch(`http://localhost:4000/news?sub_category=${subCat}`);
    return res.json();
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
// export const getValutes = async () => {
//   try {
//     connectToDb();
//     const valutes = await Valute.find();
//     return valutes;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch valutes!");
//   }
// };
// export const getPosts = async () => {
//   try {
//     connectToDb();
//     const posts = await News.find();
//     return posts;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch posts!");
//   }
// };

// export const getPost = async (slug) => {
//   try {
//     connectToDb();
//     const post = await News.findOne({ slug });
//     return post;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch post!");
//   }
// };

// export const getUser = async (id) => {
//   try {
//     connectToDb();
//     const user = await User.findById(id);
//     return user;
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to fetch user!");
//   }
// };

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
