import Product from "@/lib/models/Product";
import connectToDatabase from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const url = new URL(req.url);
    const idsParam = url.searchParams.get("ids");

    if (!idsParam) {
      return NextResponse.json([]);
    }

    const ids = idsParam.split(",");
    const products = await Product.find({
      _id: { $in: ids },
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error("[GUEST_WISHLIST_GET]", err);
    return new NextResponse("Server Error", { status: 500 });
  }
}
