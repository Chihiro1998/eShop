"use client";

import ProductCard from "./ProductCard";

const mockProducts = [
  {
    id: "1",
    title: "Spy x Family Tshirt",
    price: 26.0,
    imageUrl: "/images/products/shirt-1.jpg",
    category: "Tops",
  },
  {
    id: "2",
    title: "Floral Sweatshirt",
    price: 32.5,
    imageUrl: "/images/products/sweatshirt-1.jpg",
    category: "Sweatshirt",
  },
  {
    id: "3",
    title: "Summer Dress",
    price: 48.0,
    imageUrl: "/images/products/dress-1.jpg",
    category: "Dress",
  },
  {
    id: "4",
    title: "CASHMERE CREW NECK ROSE_PINK",
    price: 160.0,
    imageUrl: "/images/products/knit-1.jpg",
    category: "Knit",
  },
  {
    id: "5",
    title: "SILK BOW HAIR CLIP_NAVY",
    price: 31.0,
    imageUrl: "/images/products/accessories-1.jpg",
    category: "Accessories",
  },
];

const CategoryProductList = ({
  selectedCategory,
}: {
  selectedCategory: string;
}) => {
  const filteredProducts =
    selectedCategory === "All Categories"
      ? mockProducts
      : mockProducts.filter((product) => product.category === selectedCategory);

  return (
    <section className="px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-purple-1">
        {selectedCategory}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryProductList;
