import User from "@/lib/models/User";
import connectToDatabase from "@/lib/mongoDB";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    if (!user) return new NextResponse("User not found", { status: 404 });

    return NextResponse.json(user.addresses || []);
  } catch (error) {
    console.error("GET error:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const newAddress = await req.json();
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    if (!user) return new NextResponse("User not found", { status: 404 });

    if (newAddress.isDefault) {
      user.addresses.forEach((addr: any) => (addr.isDefault = false));
    }

    user.addresses.push(newAddress);
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST error:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { index, setDefault, data } = await req.json();
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    if (!user || !user.addresses[index])
      return new NextResponse("Address not found", { status: 404 });

    if (setDefault === true) {
      user.addresses.forEach((a: any, i: number) => {
        a.isDefault = i === index;
      });
    }

    if (data) {
      Object.assign(user.addresses[index], data);
    }

    await user.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH error:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { index } = await req.json();
    await connectToDatabase();
    const user = await User.findOne({ clerkId: userId });
    if (!user || !user.addresses[index])
      return new NextResponse("Address not found", { status: 404 });

    user.addresses.splice(index, 1);
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
