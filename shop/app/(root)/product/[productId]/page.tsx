"use client";

import { useParams } from "next/navigation";

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params?.productId;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-purple-1 mb-4">Product Detail</h1>
      <p className="text-gray-700">
        Showing detail for product ID: {productId}
      </p>
    </div>
  );
};

export default ProductDetailPage;
