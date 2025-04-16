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
  user: string;
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
      if (!user?.id) return;
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  return (
    <section>
      <h2 className="text-2xl font-[Pacifico] text-purple-1 mb-4">
        🧾 My Order History
      </h2>
      <p className="text-gray-600 text-base mb-6">
        Review your past purchases, view order IDs, and check details at a
        glance.
      </p>

      {loading ? (
        <p className="text-gray-500">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-6 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-purple-1">Order ID:</span>{" "}
                  <span className="font-mono">{order._id}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Placed on{" "}
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {order.items.map((item, index) => (
                <div key={index} className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 relative">
                    <Image
                      src={item.product?.media?.[0] || "/placeholder.jpg"}
                      alt={item.product?.title || "Product"}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.product?.title || "Unnamed Product"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm font-semibold text-purple-1">
                      Subtotal: ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="mt-4 font-semibold text-purple-1 text-right">
                Total: ${order.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OrdersSection;
