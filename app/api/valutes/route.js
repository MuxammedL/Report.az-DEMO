import Valute from "@/models/valute";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const valute = await Valute.find();
    return new Response(JSON.stringify(valute), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch valute", { status: 500 });
  }
};
