import { connectToDb } from "./utils";
import { News, User, Valute } from "./models";



export const getPosts = async () => {
  try {
    const res = await fetch("http://localhost:4000/news", {
      next: { revalidate: 300 },
    });
    return res.json();
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

export const getUser = async (id) => {
  try {
    connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

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
