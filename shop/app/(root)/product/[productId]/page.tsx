"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

// 💡 假数据（实际应该从数据库获取）
const mockProducts = [
  {
    id: "1",
    title: "Spy x Family Tshirt",
    price: 26.0,
    imageUrl: "/images/products/shirt-1.jpg",
    category: "Tops",
  },
  {
    id: "2",
    title: "Floral Sweatshirt",
    price: 32.5,
    imageUrl: "/images/products/sweatshirt-1.jpg",
    category: "Sweatshirt",
  },
  {
    id: "3",
    title: "Summer Dress",
    price: 48.0,
    imageUrl: "/images/products/dress-1.jpg",
    category: "Dress",
  },
  {
    id: "4",
    title: "CASHMERE CREW NECK ROSE_PINK",
    price: 160.0,
    imageUrl: "/images/products/knit-1.jpg",
    category: "Knit",
  },
  {
    id: "5",
    title: "SILK BOW HAIR CLIP_NAVY",
    price: 31.0,
    imageUrl: "/images/products/accessories-1.jpg",
    category: "Accessories",
  },
];

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params?.productId as string;
  const product = mockProducts.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState(1);
  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (!product) {
    return (
      <div className="p-10">
        <h1 className="text-xl text-red-500">Product not found.</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* 图片区域 */}
      <div className="relative w-full aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      {/* 信息区域 */}
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-black">{product.title}</h1>

        <div className="flex items-center justify-between border px-4 py-2">
          <span>{product.title}</span>
          <div className="flex items-center gap-4">
            <button onClick={decrement} className="text-lg font-medium">
              -
            </button>
            <span>{quantity}</span>
            <button onClick={increment} className="text-lg font-medium">
              +
            </button>
          </div>
          <span className="font-medium">${product.price.toFixed(2)}</span>
        </div>

        <div>
          <p className="text-gray-700">TOTAL</p>
          <p className="text-xl font-bold">
            ${(product.price * quantity).toFixed(2)}
          </p>
        </div>

        <button className="bg-purple-1 text-white py-3 px-6 uppercase">
          Buy It Now
        </button>
        <button className="border border-black text-black py-3 px-6 uppercase">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
