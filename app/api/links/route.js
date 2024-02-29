import Link from "@/models/links";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const link = await Link.find();
    return new Response(JSON.stringify(link), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch valute", { status: 500 });
  }
};
