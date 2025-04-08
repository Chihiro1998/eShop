"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ProductType } from "@/lib/types"
import Delete from "../custom ui/Delete"
import Image from "next/image"

//columns definition

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <p className="text-sm font-medium">{row.original.title}</p>
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      return <Image src={row.original.media[0]} width={100} height={100} alt={row.original.title} />
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
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "expense",
    header: "Expense",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <Delete id={row.original.id} />
    },
  }
]
