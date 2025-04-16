"use client";

import useWishlist from "@/lib/hooks/useWishlist";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  title: string;
  price: number;
  media: string[];
  category: string[];
}

const PRODUCTS_PER_BATCH = 15;

const CategoryProductList = ({
  selectedCategory,
}: {
  selectedCategory: string;
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_BATCH);
  const [loading, setLoading] = useState(true);

  const { wishlistIds, refreshWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();

        const filtered =
          selectedCategory === "All Categories"
            ? data
            : data.filter((p: Product) =>
                p.category?.includes(selectedCategory)
              );

        setAllProducts(filtered);
        setVisibleCount(PRODUCTS_PER_BATCH);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const visibleProducts = allProducts.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_BATCH);
  };

  const hasMore = visibleCount < allProducts.length;

  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-purple-1">
        {selectedCategory}
      </h2>

      {loading ? (
        <p className="text-grey-1">Loading products...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                price={product.price}
                imageUrl={product.media?.[0] || "/placeholder.jpg"}
                initialLiked={wishlistIds.includes(product._id)}
                onToggle={() => refreshWishlist()}
              />
            ))}
          </div>

          {hasMore ? (
            <div className="mt-8 text-center">
              <button
                onClick={handleViewMore}
                className="px-6 py-2 rounded bg-purple-1 text-white hover:bg-purple-2 transition"
              >
                View More
              </button>
            </div>
          ) : (
            <p className="mt-6 text-center text-gray-500">
              No more products to show.
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default CategoryProductList;
