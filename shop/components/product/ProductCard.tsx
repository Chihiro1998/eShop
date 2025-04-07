"use client";

import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ProductCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}

const ProductCard = ({ id, title, imageUrl, price }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      const local = localStorage.getItem("wishlist") || "[]";
      const parsed = JSON.parse(local);
      if (parsed.includes(id)) {
        setLiked(true);
      }
    }
  }, [id, isSignedIn]);

  const toggleWishlist = async () => {
    try {
      setLiked((prev) => !prev);

      if (isSignedIn) {
        const res = await fetch(`/api/wishlist/${id}`, {
          method: "POST",
        });

        if (!res.ok) {
          console.error("Failed to update wishlist");
        }
      } else {
        const existing = localStorage.getItem("wishlist") || "[]";
        let parsed = JSON.parse(existing);

        if (liked) {
          parsed = parsed.filter((pid: string) => pid !== id);
        } else {
          parsed.push(id);
        }

        localStorage.setItem("wishlist", JSON.stringify(parsed));
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Link href={`/product/${id}`} className="block">
      <div className="w-full rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist();
            }}
            className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md z-10"
          >
            <Heart
              className={`w-5 h-5 transition ${
                liked ? "fill-pink-500 text-pink-1" : "text-purple-1"
              }`}
            />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-[Pacifico] text-lg text-black mb-1">{title}</h3>
          <p className="text-base text-black font-medium">
            ${price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
