"use client"

import { use, useEffect } from "react"
import { ProductType } from "@/lib/types"
import { useState } from "react"
import Loader from "@/components/custom ui/Loader"
import ProductForm from "@/components/products/ProductForm"

type PageParams = {
  productId: string
}

const ProductPage = ({ params }: { params: Promise<PageParams> }) => {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState<ProductType | null>(null)
  const resolvedParams = use(params)

  const getProduct = async () => {
    try {
      setLoading(true)

      const res = await fetch(`/api/products/${resolvedParams.productId}`, {
        method: "GET",
      })
      console.log("res", res)
      const data = await res.json()
      console.log("data", data)
      setProduct(data)
      setLoading(false)
    } catch (err) {
      console.log("[product_GET]", err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <ProductForm initalData={product} />
  )
}

export default ProductPage
