import Product from "@/lib/models/Product"
import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongoDB"
export const POST = async (req: NextRequest) => {
    try {
        // check admin

        await connectToDB()
        const { title, description, media, category,
            collections,
            tags,
            sizes,
            price,
            expense } = await req.json()
        const existingProduct = await Product.findOne({ title })
        if (existingProduct) {
            return new NextResponse("Collect already existed", { status: 400 })
        }
        if (!title || !media) {
            console.log("Title and image are required")
            return new NextResponse("Title and image are required", { status: 400 })
        }
        const newProduct = await Product.create({
            title,
            description,
            media,
            category,
            collections,
            tags,
            sizes,
            price,
            expense
        })
        await newProduct.save()
        return NextResponse.json(newProduct, { status: 200 })
    } catch (err) {
        console.log("[product_POST]", err)
        return new NextResponse("internal Server Error", { status: 500 })
    }
}