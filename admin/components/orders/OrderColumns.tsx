"use client"

import { ColumnDef } from "@tanstack/react-table"
import { OrderColumnsType } from "@/lib/types"

import Delete from "../custom ui/Delete"
import Link from "next/link"

export const columns: ColumnDef<OrderColumnsType>[] = [
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => {
      return (
        <Link href={`/orders/${row.original._id}`} className="hover:text-red-1">
          <div>{row.original._id}</div>
        </Link>)
    }
  },
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  // {
  //   accessorKey: "items",
  //   header: "Products",
  //   cell: ({ row }) => {
  //     const items = row.original.items
  //     return (
  //       <div className="flex flex-col gap-1">
  //         {items.map((item, index) => (
  //           <div key={index} className="text-sm">
  //             {item.productId} x {item.quantity}
  //           </div>
  //         ))}
  //       </div>
  //     )
  //   }
  // },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return <div>${row.original.amount}</div>
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <Delete id={row.original._id} type="order" />
    }
  }
] 