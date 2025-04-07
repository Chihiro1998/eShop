import Product from "@/lib/models/Product";
import User from "@/lib/models/User";
import connectToDatabase from "@/lib/mongoDB";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    await connectToDatabase();

    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const product = await Product.findById(params.productId);
    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      user = await User.create({ clerkId: userId, wishlist: [product._id] });
    } else {
      const isInWishlist = user.wishlist.includes(product._id);
      if (isInWishlist) {
        user.wishlist = user.wishlist.filter(
          (itemId: string) => itemId.toString() !== product._id.toString()
        );
      } else {
        user.wishlist.push(product._id);
      }
      await user.save();
    }

    return NextResponse.json({
      message: "Wishlist updated",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("Wishlist Error:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
