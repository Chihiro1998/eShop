import { NextResponse } from "next/server"
import Collection from "@/lib/models/Collection"
import { connectToDB } from "@/lib/mongoDB"
import { NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB()
    const { title, description, image, products } = await req.json()

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 })
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
      products,
    })

    await newCollection.save()
    return NextResponse.json(newCollection, { status: 200 })
  } catch (err) {
    console.log("[collection_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()
    const collections = await Collection.find()
    return NextResponse.json(collections, { status: 200 })
  } catch (err) {
    console.log("[collection_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}



