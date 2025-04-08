"use client"

import { use, useEffect } from "react"
import { CollectionType } from "@/lib/types"
import { useState } from "react"
import Loader from "@/components/custom ui/Loader"
import CollectionForm from "@/components/collections/CollectionForm"

type PageParams = {
  collectionId: string
}

const CollectionPage = ({ params }: { params: Promise<PageParams> }) => {
  const [loading, setLoading] = useState(false)
  const [collection, setCollection] = useState<CollectionType | null>(null)
  const resolvedParams = use(params)

  const getCollection = async () => {
    try {
      setLoading(true)

      const res = await fetch(`/api/collections/${resolvedParams.collectionId}`, {
        method: "GET",
      })
      const data = await res.json()
      setCollection(data)
      setLoading(false)
    } catch (err) {
      console.log("[collection_GET]", err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getCollection()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <CollectionForm initalData={collection} />
  )
}

export default CollectionPage
