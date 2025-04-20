import User from "@/lib/models/User";
import connectToDatabase from "@/lib/mongoDB";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { userId } = getAuth(req);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await User.findOne({ clerkId: userId }).populate("wishlist");

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user.wishlist);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
