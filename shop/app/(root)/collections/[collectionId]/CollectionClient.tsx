"use client";

import ProductCard from "@/components/product/ProductCard";
import useWishlist from "@/lib/hooks/useWishlist";

interface Product {
  _id: string;
  title: string;
  price: number;
  media: string[];
}

const CollectionClient = ({ products }: { products: Product[] }) => {
  const { wishlistIds } = useWishlist();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          title={product.title}
          price={product.price}
          imageUrl={product.media?.[0] || "/placeholder.jpg"}
          initialLiked={wishlistIds.includes(product._id)}
        />
      ))}
    </div>
  );
};

export default CollectionClient;
