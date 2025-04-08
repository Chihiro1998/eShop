"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const useWishlist = () => {
  const { isSignedIn } = useUser();
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const fetchWishlist = async () => {
    try {
      if (isSignedIn) {
        const res = await fetch("/api/wishlist");
        const data = await res.json();
        const ids = data.map((item: any) => item._id);
        setWishlistIds(ids);
      } else {
        const local = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlistIds(local);
      }
    } catch (err) {
      console.error("Failed to load wishlist", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isSignedIn]);

  return {
    wishlistIds,
    refreshWishlist: fetchWishlist,
  };
};

export default useWishlist;
