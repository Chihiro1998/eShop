"use client"

import { ColumnDef } from "@tanstack/react-table"
import { OrderItemType } from "@/lib/types"

import Delete from "../custom ui/Delete"
import Link from "next/link"

export const columns: ColumnDef<OrderItemType>[] = [
  {
    accessorKey: "product",
    header: "Product",
    cell: ({ row }) => {
      return (
        <Link href={`/products/${row.original.product.id}`} className="hover:text-red-1">
          <div>{row.original.product.title}</div>
        </Link>)
    }
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <div>${row.original.price}</div>
    }
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return <Delete id={row.original._id} type="order" />
  //   }
  // }
] 