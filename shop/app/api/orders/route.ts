import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import connectToDatabase from "@/lib/mongoDB";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    await connectToDatabase();

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    // enrich order items with product details
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const enrichedItems = await Promise.all(
          order.items.map(async (item: any) => {
            const product = await Product.findById(item.productId);
            return {
              ...item.toObject(),
              product: product
                ? {
                    title: product.title,
                    media: product.media,
                  }
                : null,
            };
          })
        );

        return {
          ...order.toObject(),
          items: enrichedItems,
        };
      })
    );

    return NextResponse.json(enrichedOrders);
  } catch (error) {
    console.error("Error fetching enriched orders:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
