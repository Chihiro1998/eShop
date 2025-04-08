"use client";

import ProductCard from "@/components/product/ProductCard";
import useWishlist from "@/lib/hooks/useWishlist";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  media: string[];
  price: number;
}

const WishlistPage = () => {
  const { isSignedIn } = useUser();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { wishlistIds } = useWishlist();

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
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-purple-1 mb-8">
        💜 My Wishlist
      </h1>

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
              initialLiked={wishlistIds.includes(product._id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default WishlistPage;
