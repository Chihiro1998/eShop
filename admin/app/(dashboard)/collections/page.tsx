"use client"


import { Separator } from "@/components/ui/separator";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function Collections() {
  return (
    <div className="px-10 py-5">
      <div className="flex justify-between items-center">
        <p className={`${pacifico.className} text-[32px] text-purple-1 mb-2`}>Collections</p>
      </div>
      <Separator className="bg-grey-1 mt-4" />
    </div>
  );
}

