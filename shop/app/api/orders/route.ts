import Order from "@/lib/models/Order";
import connectToDatabase from "@/lib/mongoDB";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    await connectToDatabase();

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
