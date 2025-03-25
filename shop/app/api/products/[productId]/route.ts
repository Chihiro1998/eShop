import Product from "@/lib/models/Product";
import connectToDatabase from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { productId: string } }
) {
  try {
    await connectToDatabase();

    const { productId } = await context.params;

    const product = await Product.findById(productId);

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
