"use client"

import { useEffect, useState } from "react"
import { OrderType } from "@/lib/types"
import Loader from "@/components/custom ui/Loader"
import { Separator } from "@/components/ui/separator"
import { Pacifico } from "next/font/google"
import { format } from "date-fns"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function OrderPage() {
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState<OrderType | null>(null)
  const params = useParams()
  const orderId = params.orderId as string

  const getOrder = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/orders/${orderId}`)
      const data = await res.json()
      setOrder(data)
      setLoading(false)
    } catch (err) {
      console.log("[order_GET]", err)
      setLoading(false)
    }
  }

  useEffect(() => {
    getOrder()
  }, [orderId])

  if (loading) {
    return <Loader />
  }

  if (!order) {
    return <div>Order not found</div>
  }

  return (
    <div className="px-10 py-5">
      <div className="flex justify-between items-center">
        <p className={`${pacifico.className} text-[32px] text-purple-1 mb-2`}>Order Details</p>
      </div>
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Order Information</h3>
            <p>Order ID: {order._id}</p>
            <p>User ID: {order.user}</p>
            <p>Created At: {format(new Date(order.createdAt), "yyyy-MM-dd HH:mm:ss")}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="border p-4 rounded flex items-start gap-4">
                  {item.product && (
                    <>
                      <div className="w-24 h-24 relative">
                        <Image
                          src={item.product.media[0]}
                          alt={item.product.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <Link
                          href={`/products/${item.product.id}`}
                          className="text-lg font-medium hover:text-red-1 transition-colors"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-gray-600">Price per unit: ${item.price}</p>
                        <p className="font-medium">Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="border p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.amount}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${order.amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}