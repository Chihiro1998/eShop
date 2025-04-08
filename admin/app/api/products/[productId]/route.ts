import Product from "@/lib/models/Product"
import { NextResponse } from "next/server"

import { connectToDB } from "@/lib/mongoDB"
import { NextRequest } from "next/server"
import { auth } from "@clerk/nextjs/server"

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    await connectToDB()
    const { productId } = params
    console.log("productId", productId)
    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 })
    }

    const product = await Product.findById(productId)
    if (!product) {
      return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 })
    }
    return NextResponse.json(product, { status: 200 })
  } catch (err) {
    console.log("[product_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const POST = async (req: NextRequest, { params }: { params: { productId: string } }) => {
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

    let productData = await Product.findById(params.productId)
    if (!productData) {
      return new NextResponse("Product not found", { status: 404 })
    }
    const { title, description, media, category, collections, tags, sizes, price, expense } = await req.json()
    if (!title || !media) {
      return new NextResponse("Title and image are required", { status: 400 })
    }
    productData = await Product.findByIdAndUpdate(params.productId, {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      price,
      expense
    }, { new: true })
    await productData.save()
    return NextResponse.json(productData, { status: 200 })

  } catch (err) {
    console.log("[product_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const DELETE = async (req: NextRequest, { params }: { params: { productId: string } }) => {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    await connectToDB()
    const { productId } = params
    console.log("productId", productId)

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