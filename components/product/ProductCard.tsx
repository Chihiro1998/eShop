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
  initialLiked?: boolean;
  onToggle?: (id: string, newState: boolean) => void;
}

const ProductCard = ({
  id,
  title,
  imageUrl,
  price,
  initialLiked = false,
  onToggle,
}: ProductCardProps) => {
  const [liked, setLiked] = useState(initialLiked);
  const { isSignedIn } = useUser();

  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  const toggleWishlist = async () => {
    const newState = !liked;
    setLiked(newState);
    onToggle?.(id, newState);

    try {
      if (isSignedIn) {
        const res = await fetch(`/api/wishlist/${id}`, {
          method: "POST",
        });

        if (!res.ok) {
          console.error("Failed to update wishlist");
        }
      } else {
        const local = JSON.parse(localStorage.getItem("wishlist") || "[]");
        const updated = newState
          ? [...new Set([...local, id])]
          : local.filter((pid: string) => pid !== id);

        localStorage.setItem("wishlist", JSON.stringify(updated));
      }
    } catch (err) {
      console.error("Error updating wishlist", err);
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
          <h3 className="font-[Roboto] text-base text-black mb-1">{title}</h3>
          <p className="text-base text-black font-medium">
            ${price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
