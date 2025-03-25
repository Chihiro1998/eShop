import Product from "@/lib/models/Product";
import dbConnect from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find({});
    return NextResponse.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    return new NextResponse("Failed to fetch", { status: 500 });
  }
}
