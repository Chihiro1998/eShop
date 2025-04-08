import User from "@/lib/models/User"
import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/server"

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