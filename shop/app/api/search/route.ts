import Product from "@/lib/models/Product";
import connectToDatabase from "@/lib/mongoDB";

export async function GET(req: Request) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const query = {
    isArchived: false,
    $or: [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
      { tags: { $in: [new RegExp(q, "i")] } },
    ],
  };

  const products = await Product.find(query).lean();

  return Response.json(products);
}
