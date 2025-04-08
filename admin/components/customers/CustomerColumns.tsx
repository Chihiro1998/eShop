"use client"

import { ColumnDef } from "@tanstack/react-table"
import { UserType } from "@/lib/types"
import { format } from "date-fns"
import Delete from "../custom ui/Delete"

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "clerkId",
    header: "User ID",
  },
  {
    accessorKey: "wishlist",
    header: "Wishlist",
    cell: ({ row }) => {
      const wishlist = row.original.wishlist
      return (
        <div className="flex flex-col gap-1">
          {wishlist?.length || 0} items
        </div>
      )
    }
  },
  {
    accessorKey: "addresses",
    header: "Addresses",
    cell: ({ row }) => {
      const addresses = row.original.addresses
      return (
        <div className="flex flex-col gap-1">
          {addresses?.length || 0} addresses
        </div>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <div>{format(new Date(row.original.createdAt), "yyyy-MM-dd HH:mm:ss")}</div>
    }
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return <Delete id={row.original.id} type="user" />
  //   }
  // }
] 