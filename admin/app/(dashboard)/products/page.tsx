"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DataTable } from "@/components/custom ui/DataTable"
import { columns } from "@/components/products/ProductColumns"
import { Pacifico } from "next/font/google"

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

const Products = () => {

  // get the data 
  const router = useRouter()
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      })
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.log("[products_GET", err)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])

  console.log(products)

  return (
    <div className="px-10 py-5">
      <div className="flex justify-between items-center">
        <p className={`${pacifico.className} text-[32px] text-purple-1 mb-2`}>Products Table</p>
        <Button className="bg-purple-2 text-white rounded-full"
          onClick={() => {
            router.push("/products/new")
          }}>
          <Plus className="w-4 h-4 mr-2" />
          Create Product
        </Button>
      </div>
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <DataTable columns={columns} data={products} />
    </div>
  )
}

export default Products
