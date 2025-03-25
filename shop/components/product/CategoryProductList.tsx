"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  _id: string;
  title: string;
  price: number;
  media: string[];
  category: string;
}

const CategoryProductList = ({
  selectedCategory,
}: {
  selectedCategory: string;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();

        const filtered =
          selectedCategory === "All Categories"
            ? data
            : data.filter((p: Product) => p.category === selectedCategory);

        setProducts(filtered);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-purple-1">
        {selectedCategory}
      </h2>

      {loading ? (
        <p className="text-grey-1">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              imageUrl={product.media?.[0] || "/placeholder.jpg"}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryProductList;
