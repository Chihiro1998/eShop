"use client";

import ProductCard from "@/components/product/ProductCard";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  media: string[];
  price: number;
}

const Wishlist = () => {
  const { isSignedIn } = useUser();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);

      try {
        if (isSignedIn) {
          const res = await fetch("/api/wishlist");
          const data = await res.json();
          setWishlist(data);
        } else {
          const stored = localStorage.getItem("wishlist") || "[]";
          const ids = JSON.parse(stored);
          if (ids.length > 0) {
            const res = await fetch(`/api/wishlist/guest?ids=${ids.join(",")}`);
            const data = await res.json();
            setWishlist(data);
          } else {
            setWishlist([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [isSignedIn]);

  return (
    <section>
      <h2 className="text-2xl font-[Pacifico] text-purple-1 mb-4">
        💜 My Wishlist
      </h2>
      <p className="text-gray-600 text-base mb-6">
        Save the pieces you love — they'll be waiting for you here anytime.
      </p>
      {loading ? (
        <p>Loading...</p>
      ) : wishlist.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              imageUrl={product.media?.[0] || "/placeholder.jpg"}
              initialLiked={true}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Wishlist;
