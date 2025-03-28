"use client";

import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

const BackButton: React.FC = () => {
  const router = useRouter()
  return (<Button
    onClick={() => router.back()}
    variant="outline"
    className="rounded-full bg-purple-2 text-white"
  >Back</Button>)
}

export default BackButton
