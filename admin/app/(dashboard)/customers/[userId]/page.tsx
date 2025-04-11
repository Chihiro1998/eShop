"use client"
import { Separator } from "@/components/ui/separator";
import { UserType } from "@/lib/types";
import { Pacifico } from "next/font/google";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function CustomerDetails() {
  const params = useParams()
  const userId = params.userId as string
  const [customer, setCustomer] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)

  const getCustomer = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/users/${userId}`)
      const userData = await res.json()
      console.log("[customer_GET]", userData.wishlist)
      setCustomer(userData)
      setLoading(false)
    } catch (err) {
      console.log("[customer_GET]", err)
      return null
    }
  }

  useEffect(() => {
    getCustomer()
  }, [userId])

  if (loading) {
    return <Toaster />
  }

  return (
    <div className="px-10 py-5">
      <div className="flex justify-between items-center">
        <p className={`${pacifico.className} text-[32px] text-purple-1 mb-2`}>Customer Details</p>
      </div>
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Order Information</h3>
            <div className="space-y-2">
              <p>User ID: {customer?.clerkId}</p>
              <p>Created At: {customer?.createdAt ? format(new Date(customer?.createdAt), "yyyy-MM-dd HH:mm:ss") : "N/A"}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <div className="space-y-2">
              {customer?.address && customer?.address.fullName ? (
                <div className="space-y-2">
                  <p><span className="font-semibold">Name:  </span>{customer?.address.fullName}</p>
                  <p><span className="font-semibold">Phone:  </span>{customer?.address.phone}</p>
                  <p><span className="font-semibold">Street: </span>{customer?.address.street}</p>
                  <p><span className="font-semibold">City:  </span>{customer?.address.city}</p>
                  <p><span className="font-semibold">State:  </span>{customer?.address.state}</p>
                  <p><span className="font-semibold">Zip Code:  </span>{customer?.address.zipCode}</p>
                  <p><span className="font-semibold">Country:  </span>{customer?.address.country}</p>
                </div>
              ) : (
                <p>No addresses</p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Wishlist</h3>
            <div className="space-y-4">
              {customer?.wishlist.length === undefined || customer?.wishlist.length > 0 ? (
                customer?.wishlist.map((item, index) => (
                  <div key={index} className="border p-4 rounded-lg flex items-start gap-4 hover:shadow-md transition-shadow">
                    <div className="w-24 h-24 relative">
                      <Image
                        src={item.media[0]}
                        alt={item.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.id}`}
                        className="text-lg font-medium hover:text-red-1 transition-colors"
                      >
                        {item.title}
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No wishlist items</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}