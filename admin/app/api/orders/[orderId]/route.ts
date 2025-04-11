import Order from "@/lib/models/Order"
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/server"
import Product from "@/lib/models/Product"
import User from "@/lib/models/User"

export const GET = async (req: NextRequest, { params }: { params: { orderId: string } }) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    await connectToDB()
    const resolvedParams = await params
    const orderId = resolvedParams.orderId
    if (!orderId) {
      return new NextResponse("Order ID is required", { status: 400 })
    }

    const order = await Order.findById(orderId)
    if (!order) {
      return new NextResponse("Order not found", { status: 404 })
    }
    const user = await User.findOne({ clerkId: order.user })
    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }
    const address = user.addresses[0]


    const productIds = order.items.map(item => item.productId)

    const products = await Product.find({
      _id: { $in: productIds }
    })

    const enrichedOrder = {
      ...order.toObject(),
      address: address,
      items: order.items.map((item: { productId: string; quantity: number; price: number }) => {
        const product = products.find(p => p._id.toString() === item.productId)
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          product: product ? {
            id: product._id.toString(),
            title: product.title,
            media: product.media,
            description: product.description,
            price: product.price
          } : undefined
        }
      })
    }
    console.log(enrichedOrder)
    return NextResponse.json(enrichedOrder, { status: 200 })
  } catch (err) {
    console.log("[order_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

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