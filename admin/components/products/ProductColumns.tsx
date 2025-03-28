"use client"

import { ColumnDef } from "@tanstack/react-table"


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
]
