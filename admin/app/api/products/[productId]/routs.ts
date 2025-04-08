import Product from "@/lib/models/Product"
import { NextResponse } from "next/server"

import { connectToDB } from "@/lib/mongoDB"
import { NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/server"




export const DELETE = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    await connectToDB()
    const { productId } = params

    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 })
    }

    await Product.findByIdAndDelete(productId)
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 })
  } catch (err) {
    console.log("[product_DELETE]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}