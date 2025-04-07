"use client"

import { ColumnDef } from "@tanstack/react-table"
import type { CollectionType } from "@/lib/types"


//columns definition

export const columns: ColumnDef<CollectionType>[] = [
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
]
