import Link from "@/models/links";
import News from "@/models/news";
import User from "@/models/user";
import Video from "@/models/videos";
import { connectToDB } from "@/utils/database";
import { unstable_noStore as noStore } from "next/cache";

export const getLinks = async () => {
  try {
    connectToDB();
    const data = await Link.find();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch links!");
  }
};

export const getPosts = async () => {
  noStore();
  try {
    connectToDB();
    const posts = await News.find();
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    return posts;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};

export const getVideos = async () => {
  try {
    connectToDB();
    const videos = await Video.find();
    return videos;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch videos!");
  }
};

export const getPost = async (slug) => {
  noStore();
  try {
    connectToDB();
    const post = await News.findOne({ slug });
    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};

export const getUser = async (id) => {
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
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

