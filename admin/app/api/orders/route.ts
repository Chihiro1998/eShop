import Order from "@/lib/models/Order"
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()
    const orders = await Order.find().sort({ createdAt: -1 })
    return NextResponse.json(orders, { status: 200 })
  } catch (err) {
    console.log("[orders_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 