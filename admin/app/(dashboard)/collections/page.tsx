"use client"

import { Separator } from "@/components/ui/separator";
import { Pacifico } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/collections/CollectionColumns";
import type { CollectionType } from "@/lib/types";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const Collections = function () {
  // get the data 
  const router = useRouter()
  const [collections, setCollections] = useState([])

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      })
      const data = await res.json()
      setCollections(data)
    } catch (err) {
      console.log("[collections_GET", err)
    }
  }

  useEffect(() => {
    getCollections()
  }, [])

  console.log(collections)
  return (
    <div className="px-10 py-5">
      <div className="flex justify-between items-center">
        <p className={`${pacifico.className} text-[32px] text-purple-1 mb-2`}>Collections</p>
        <Button className="bg-purple-2 text-white rounded-full"
          onClick={() => {
            router.push("/collections/new")
          }}>
          <Plus className="w-4 h-4 mr-2" />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-grey-1 mt-4" />
      <DataTable columns={columns} data={collections} />
    </div>
  );
}

export default Collections;
