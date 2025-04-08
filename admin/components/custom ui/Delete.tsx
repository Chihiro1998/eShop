import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { toast } from "react-hot-toast"

interface DeleteProps {
  id: string
  type: "collection" | "product"
}

const Delete = ({ id, type }: DeleteProps) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      const endpoint = type === "collection" ? `/api/collections/${id}` : `/api/products/${id}`
      const res = await fetch(endpoint, {
        method: "DELETE",
      })

      if (!res.ok) {
        console.log("res", res)
        throw new Error(`Failed to delete ${type}`)
      }
      window.location.href = type === "collection" ? "/collections" : "/products"
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`)
      setLoading(false)
    } catch (error) {
      toast.error(`Failed to delete ${type}`)
      console.error(error)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-red-500 rounded-full">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-gray-500">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-1">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your {type.charAt(0).toUpperCase() + type.slice(1)}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Delete