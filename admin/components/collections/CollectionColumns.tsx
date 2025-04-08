"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { CollectionType } from "@/lib/types"
import Delete from "../custom ui/Delete"
import Image from "next/image"
import Link from "next/link"

//columns definition

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (<Link href={`/collections/${row.original._id}`} className="hover:text-red-1"><p className="text-sm font-medium">{row.original.title}</p></Link>)
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return <Image src={row.original.image} width={100} height={100} alt={row.original.title} />
    },
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      return <p className="text-sm font-medium">{row.original.products.length}</p>
    },
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {

      return <div className="text-sm font-medium">{row.original.description}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <Delete id={row.original._id} type="collection" />
    },
  },
]
