import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoDB";
import Order from "@/lib/models/Order";


export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { typescript: true });

const Headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: Headers });
}

export async function POST(req: NextRequest) {
  try {
    const { cartItems, customer } = await req.json();

    if (!cartItems || !customer) {
      return new NextResponse("Failed to create cart items", { status: 400 });
    }

    // Map cart items to Stripe line items
    const line_items = cartItems.map((cartItem: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: cartItem.item.title,
          metadata: { productId: cartItem.item.id },
        },
        unit_amount: cartItem.item.price * 100, 
      },
      quantity: cartItem.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,
      client_reference_id: customer.clerkId,
      success_url: `${process.env.STORE_URL}/payment_success`,
      cancel_url: `${process.env.STORE_URL}/cart`,
    });

    const totalAmount = cartItems.reduce(
      (acc: number, cartItem: any) => acc + cartItem.item.price * cartItem.quantity,
      0
    );

    await connectToDatabase();
    const orderData = {
      user: customer.clerkId,
      items: cartItems.map((cartItem: any) => ({
        productId: cartItem.item.id,
        quantity: cartItem.quantity,
        price: cartItem.item.price,
      })),
      amount: totalAmount,
      sessionId: session.id, 
      status: "pending",   
    };

    const order = await Order.create(orderData);
    console.log("Order created:", order);

    return NextResponse.json(session, { headers: Headers });
  } catch (error: any) {
    console.error("[CHECKOUT_SESSION_POST]", error);
    return new NextResponse("Failed to create checkout session", { status: 500 });
  }
}
