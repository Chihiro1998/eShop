import Product from "@/lib/models/Product";
import connectToDatabase from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();

    const products = await Product.find({});

    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCTS_GET_ALL]", error);
    return new NextResponse("Failed to fetch products", { status: 500 });
  }
}
