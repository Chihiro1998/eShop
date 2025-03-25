"use client";

import { Pacifico } from "next/font/google";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  description: string;
  media: string[];
  price: number;
  category: string;
  sizes: string[];
}

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params?.productId as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeWarning, setShowSizeWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p className="p-10 text-purple-1">Loading...</p>;
  }

  if (!product) {
    return <p className="p-10 text-red-500">Product not found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Image */}
      <div className="relative w-full aspect-square">
        <Image
          src={product.media?.[0] || "/placeholder.jpg"}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-6">
        <h1 className={`${pacifico.className} text-3xl text-purple-1`}>
          {product.title}
        </h1>

        <p className="text-base text-gray-600 leading-relaxed">
          {product.description}
        </p>

        {/* Size*/}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600 font-medium">Select Size:</p>
          <div className="flex gap-2 flex-wrap">
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  setShowSizeWarning(false);
                }}
                className={`px-4 py-2 rounded border text-sm transition ${
                  selectedSize === size
                    ? "bg-purple-1 text-white border-purple-1"
                    : "bg-white text-purple-1 border-purple-1"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {showSizeWarning && (
            <p className="text-red-500 text-sm mt-1">
              Please select a size before adding to cart.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between border px-4 py-2">
          <span>{product.title}</span>
          <div className="flex items-center gap-4">
            <button onClick={() => setQuantity((q) => Math.max(q - 1, 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>
          <span className="font-medium">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>

        <div>
          <p className="text-gray-700">TOTAL</p>
          <p className="text-xl font-bold">
            ${(Number(product.price) * quantity).toFixed(2)}
          </p>
        </div>

        <button className="bg-purple-1 text-white py-3 px-6 uppercase">
          Buy It Now
        </button>
        <button
          onClick={() => {
            if (!selectedSize) {
              setShowSizeWarning(true);
              return;
            }
            alert(`Added to cart: ${product.title} - Size: ${selectedSize}`);
          }}
          className="border border-purple-1 text-purple-1 py-3 px-6 uppercase"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;
