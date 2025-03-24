"use client";

import CategoryProductList from "@/components/product/CategoryProductList";
import CategorySelector from "@/components/product/CategorySelector";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <>
      {/* Banner Section */}
      <div className="relative w-full" style={{ height: "calc(100vh - 80px)" }}>
        <Image
          src="/images/Banner.png"
          alt="Promotional Banner"
          fill
          className="object-cover rounded-none"
          priority
        />
      </div>

      {/* Category 标签选择器 */}
      <CategorySelector
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* 根据分类展示商品卡 */}
      <CategoryProductList selectedCategory={selectedCategory} />
    </>
  );
}
