import Collection from "@/lib/models/Collection";
import connectToDatabase from "@/lib/mongoDB";
import Image from "next/image";
import { notFound } from "next/navigation";
import CollectionClient from "./CollectionClient";

interface Props {
  params: {
    collectionId: string;
  };
}

const CollectionDetailPage = async ({ params }: Props) => {
  await connectToDatabase();

  const collection = await Collection.findById(params.collectionId).populate(
    "products"
  );

  if (!collection) return notFound();

  const plainCollection = JSON.parse(JSON.stringify(collection));

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <Image
        src={plainCollection.image}
        alt={plainCollection.title}
        width={1200}
        height={400}
        className="w-full max-h-[400px] object-contain rounded-lg mb-8"
      />

      <h1 className="text-3xl text-center text-purple-1 mb-4">
        {plainCollection.title}
      </h1>

      <CollectionClient products={plainCollection.products} />
    </div>
  );
};

export default CollectionDetailPage;
