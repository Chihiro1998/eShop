"use client";

import clsx from "clsx";
import { Pacifico } from "next/font/google";
import Image from "next/image";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const categories = [
  { label: "All Categories", icon: "/category-icons/new-arrivals.png" },
  { label: "New Arrivals", icon: "/category-icons/top.png" },
  { label: "Sweatshirt", icon: "/category-icons/sweatshirt.png" },
  { label: "Shirt", icon: "/category-icons/shirt.png" },
  { label: "Knit", icon: "/category-icons/knit.png" },
  { label: "Outerwear", icon: "/category-icons/outerwear.png" },
  { label: "Dress", icon: "/category-icons/dress.png" },
  { label: "Skirt", icon: "/category-icons/skirt.png" },
  { label: "Bottoms", icon: "/category-icons/bottoms.png" },
  { label: "Accessories", icon: "/category-icons/accessories.png" },
];

interface Props {
  selected: string;
  onSelect: (category: string) => void;
}

const CategorySelector = ({ selected, onSelect }: Props) => {
  return (
    <section className="px-8 py-10">
      <div className="text-left mb-6">
        <h2
          className={`${pacifico.className} text-4xl text-purple-1 tracking-wide mb-4`}
        >
          Featured Category
        </h2>
        <p className="text-gray-600 text-2xl mt-1">
          ✨ Choose your favorite category and discover your style ✨
        </p>
      </div>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-purple-1 scrollbar-track-pink-100 py-10 px-6">
        <div className="flex gap-6 min-w-fit">
          {categories.map((category) => (
            <button
              key={category.label}
              onClick={() => onSelect(category.label)}
              className={clsx(
                "flex flex-col items-center justify-center w-[160px] h-[160px] rounded-xl border hover:shadow transition",
                selected === category.label
                  ? "border-purple-1"
                  : "border-pink-1"
              )}
            >
              <div className="relative w-14 h-14 mb-2">
                <Image
                  src={category.icon}
                  alt={category.label}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-ml font-[Pacifico] text-purple-1">
                {category.label}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySelector;
