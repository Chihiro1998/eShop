"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  product?: {
    title: string;
    media: string[];
  };
}

interface Order {
  _id: string;
  amount: number;
  createdAt: string;
  items: OrderItem[];
}

const OrdersSection = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (res.ok) {
          setOrders(data);
        } else {
          console.error("Failed to fetch orders:", await res.text());
        }
      } catch (err) {
        console.error("Fetch orders error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchOrders();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl font-[Pacifico] text-purple-1 mb-4">My Orders</h2>
      <p className="text-gray-500 text-base mb-6">
        Review your past purchases and order details.
      </p>

      {loading ? (
        <p className="text-gray-400">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">You haven&apos;t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <p>
                  Order ID: <span className="font-mono">{order._id}</span>
                </p>
                <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <div className="space-y-6">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4"
                  >
                    {/* Image & Title */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-20 h-20 relative">
                        <Image
                          src={item.product?.media[0] || "/placeholder.jpg"}
                          alt={item.product?.title || "Product"}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="text-base text-gray-800 font-medium">
                        {item.product?.title || "Unnamed Product"}
                      </div>
                    </div>

                    {/* Quantity & Subtotal */}
                    <div className="text-right min-w-[120px]">
                      <p className="text-gray-600 text-sm">
                        Quantity: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                      <p className="text-purple-1 font-semibold text-sm mt-1">
                        Subtotal: ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-4 font-semibold text-right text-purple-1">
                Total: ${order.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersSection;
