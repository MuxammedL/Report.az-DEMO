import News from "@/models/news";
import { connectToDB } from "@/utils/database";
import { unstable_noStore as noStore } from "next/cache";

export const GET = async (request) => {
  try {
    noStore()
    await connectToDB();
    const news = await News.find({}).populate("creator");
    return new Response(JSON.stringify(news), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
