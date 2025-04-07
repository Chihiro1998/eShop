import ProductCard from "@/components/product/ProductCard";
import Collection from "@/lib/models/Collection";
import connectToDatabase from "@/lib/mongoDB";
import Image from "next/image";
import { notFound } from "next/navigation";

const CollectionDetailPage = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  await connectToDatabase();

  const collection = await Collection.findById(params.collectionId).populate(
    "products"
  );

  if (!collection) return notFound();

  const plainProducts = JSON.parse(JSON.stringify(collection.products));

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <Image
        src={collection.image}
        alt={collection.title}
        width={1200}
        height={400}
        className="w-full max-h-[400px] object-contain rounded-lg mb-8"
      />

      <h1 className="text-3xl text-center text-purple-1 mb-4">
        {collection.title}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {plainProducts.map((product: any) => (
          <ProductCard
            key={product._id}
            id={product._id}
            title={product.title}
            price={product.price}
            imageUrl={product.media?.[0] || "/placeholder.jpg"}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetailPage;
