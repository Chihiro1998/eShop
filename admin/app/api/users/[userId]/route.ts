import User from "@/lib/models/User"
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/server"
import Product from "@/lib/models/Product"


export const GET = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {

    await connectToDB()
    const resolvedParams = await params
    const userId = resolvedParams.userId
    const user = await User.findOne({ clerkId: userId })
    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const wishlist = await Product.find({
      _id: { $in: user.wishlist }
    })

    const address = user.addresses[0]
    const enrichedUser = {
      ...user.toObject(),
      wishlist: wishlist,
      address: address
    }
    // console.log(enrichedUser)
    return NextResponse.json(enrichedUser, { status: 200 })
  } catch (err) {
    console.log("[user_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: { userId: string } }) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    await connectToDB()
    const { userId: targetUserId } = params
    if (!targetUserId) {
      return new NextResponse("User ID is required", { status: 400 })
    }

    await User.findByIdAndDelete(targetUserId)
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 })
  } catch (err) {
    console.log("[user_DELETE]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 