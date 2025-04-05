"use client";

import { Pacifico } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

interface Collection {
  _id: string;
  title: string;
  image: string;
}

const CollectionList = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const mockCollections = [
      {
        _id: "1",
        title: "Spring Collection",
        image: "/images/collections/spring.jpg",
      },
      {
        _id: "2",
        title: "Knitwear Picks",
        image: "/images/collections/knit.jpg",
      },
    ];
    setCollections(mockCollections);
  }, []);

  return (
    <section className="px-8 py-10">
      <div className="text-left mb-6">
        <h2
          className={`${pacifico.className} text-4xl text-purple-1 tracking-wide mb-4`}
        >
          Collections
        </h2>
        <p className="text-gray-600 text-2xl">
          ✨ Discover curated outfits for every vibe and season ✨
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((collection) => (
          <Link
            key={collection._id}
            href={`/collections/${collection._id}`}
            className="block w-full"
          >
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow hover:shadow-xl transition">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-3 text-lg text-purple-1">{collection.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CollectionList;
