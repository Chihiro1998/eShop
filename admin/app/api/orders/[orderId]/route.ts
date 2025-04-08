import Order from "@/lib/models/Order"
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/server"

export const DELETE = async (req: NextRequest, { params }: { params: { orderId: string } }) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    await connectToDB()
    const { orderId } = params
    if (!orderId) {
      return new NextResponse("Order ID is required", { status: 400 })
    }

    await Order.findByIdAndDelete(orderId)
    return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 })
  } catch (err) {
    console.log("[order_DELETE]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 