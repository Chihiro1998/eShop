import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import connectToDatabase from "@/lib/mongoDB";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const collection = await Collection.findById(params.id);

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    const products = await Product.find({
      collections: collection._id,
      isArchived: false,
    });

    return NextResponse.json({
      ...collection.toObject(),
      products,
    });
  } catch (err) {
    console.error("Error fetching collection:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
