import News from "@/models/news";
import { connectToDB } from "@/utils/database";

// GET
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const news = await News.findById(params.id).populate("userId");
    if (!news) return new Response("News not found!", { status: 404 });
    return new Response(JSON.stringify(news), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all news!", { status: 500 });
  }
};

// PATCH
export const PATCH = async (request, { params }) => {
  const { category, sub_category, title, date, text, important, image, slug } =
    await request.json();

  try {
    await connectToDB();

    // Find the existing news by ID
    const existingNews = await News.findById(params.id);

    if (!existingNews) {
      return new Response("News not found", { status: 404 });
    }

    // Update the news with new data
    existingNews.category = category;
    existingNews.sub_category = sub_category;
    existingNews.title = title;
    existingNews.date = date;
    existingNews.text = text;
    existingNews.important = important;
    existingNews.image = image;
    existingNews.slug = slug;

    await existingNews.save();

    return new Response("Successfully updated the News", { status: 200 });
  } catch (error) {
    return new Response("Error Updating News", { status: 500 });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    // Find the news by ID and remove it
    await News.deleteOne({ _id: params.id });
    return new Response("News deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting news", { status: 500 });
  }
};
