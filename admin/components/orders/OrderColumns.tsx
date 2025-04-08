"use client"

import { ColumnDef } from "@tanstack/react-table"
import { OrderType } from "@/lib/types"
import { format } from "date-fns"
import Delete from "../custom ui/Delete"

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "items",
    header: "Products",
    cell: ({ row }) => {
      const items = row.original.items
      return (
        <div className="flex flex-col gap-1">
          {items.map((item, index) => (
            <div key={index} className="text-sm">
              {item.productId} x {item.quantity}
            </div>
          ))}
        </div>
      )
    }
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return <div>¥{row.original.amount.toFixed(2)}</div>
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <div>{format(new Date(row.original.createdAt), "yyyy-MM-dd HH:mm:ss")}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <Delete id={row.original._id} type="order" />
    }
  }
] 