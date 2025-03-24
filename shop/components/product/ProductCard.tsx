"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  title: string;
  imageUrl: string;
  price: number;
}

const ProductCard = ({ title, imageUrl, price }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);

  const toggleWishlist = () => {
    setLiked(!liked);
    // Here to implement the logic to add it to wishlist or your collections
    console.log(`${title} ${!liked ? "added to" : "removed from"} wishlist`);
  };

  return (
    <div className="w-full  rounded-lg shadow-sm overflow-hidden">
      {/* Picture + like */}
      <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md"
        >
          <Heart
            className={`w-5 h-5 transition ${
              liked ? "fill-pink-500 text-pink-1" : "text-purple-1"
            }`}
          />
        </button>
      </div>

      {/* Name + Prices */}
      <div className="p-4">
        <h3 className="font-[Pacifico] text-lg text-black mb-1">{title}</h3>
        <p className="text-base text-black font-medium">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
