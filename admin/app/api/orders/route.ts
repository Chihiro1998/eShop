import Order from "@/lib/models/Order"
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest } from "next/server"
import User from "@/lib/models/User"
import { format } from "date-fns"

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()
    const orders = await Order.find().sort({ createdAt: -1 })
    console.log("orders", orders)
    const orderDetails = await Promise.all(orders.map(async (order) => {

      const user = await User.findOne({ clerkId: order.user })
      return {
        _id: order._id,
        user: user?.clerkId,
        products: order.items.length,
        amount: order.amount,
        createdAt: format(order.createdAt, "yyyy-MM-dd")
      }
    }))
    return NextResponse.json(orderDetails, { status: 200 })
  } catch (err) {
    console.log("[orders_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 