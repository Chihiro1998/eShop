"use client";

import ProductCard from "@/components/product/ProductCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductType {
  _id: string;
  title: string;
  description: string;
  media: string[];
  category: string[];
  tags?: string[];
  price: number | { $numberDecimal: string };
}

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q") || "";

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();

        const parsed = data.map((item: any) => ({
          ...item,
          price: item.price?.$numberDecimal
            ? parseFloat(item.price.$numberDecimal)
            : item.price,
        }));

        setProducts(parsed);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="px-10 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Search results for "{decodeURIComponent(query)}"
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600 mt-4">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.title}
              imageUrl={product.media?.[0]}
              price={
                typeof product.price === "object"
                  ? parseFloat(product.price.$numberDecimal)
                  : product.price
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
