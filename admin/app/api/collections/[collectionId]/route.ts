import Collection from "@/lib/models/Collection"
import { NextResponse } from "next/server"

import { connectToDB } from "@/lib/mongoDB"
import { NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/server"


export const GET = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
  try {

    await connectToDB()
    const { collectionId } = params

    if (!collectionId) {
      return new NextResponse("Collection ID is required", { status: 400 })
    }

    const collection = await Collection.findById(collectionId)
    if (!collection) {
      return new NextResponse(JSON.stringify({ message: "Collection not found" }), { status: 404 })
    }

    return NextResponse.json(collection, { status: 200 })
  } catch (err) {
    console.log("[collection_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const POST = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    await connectToDB()

    let collectionData = await Collection.findById(params.collectionId)
    if (!collectionData) {
      return new NextResponse("Collection not found", { status: 404 })
    }

    const { title, description, image, products } = await req.json()
    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 })
    }
    collectionData = await Collection.findByIdAndUpdate(params.collectionId, {
      title,
      description,
      image,
      products,
    }, { new: true })
    await collectionData.save()
    return NextResponse.json(collectionData, { status: 200 })

  } catch (err) {
    console.log("[collection_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: { collectionId: string } }) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    await connectToDB()
    const { collectionId } = params

    if (!collectionId) {
      return new NextResponse("Collection ID is required", { status: 400 })
    }

    await Collection.findByIdAndDelete(collectionId)
    return NextResponse.json({ message: "Collection deleted successfully" }, { status: 200 })
  } catch (err) {
    console.log("[collection_DELETE]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}