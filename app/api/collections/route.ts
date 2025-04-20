import Collection from "@/lib/models/Collection";
import connectToDatabase from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const collections = await Collection.find().populate("products");

    return NextResponse.json(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    return new NextResponse("Failed to fetch collections", { status: 500 });
  }
}
