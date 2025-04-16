"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  amount: number;
  createdAt: string;
}

const OrdersSection = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return;
      try {
        const res = await fetch(`/api/orders?user=${user.id}`);
        const data = await res.json();
        setOrders(data.orders || data); // 根据你后端返回格式调整
      } catch (error) {
        console.error("Error fetching orders:", error);
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
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-xl p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center">
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

              <ul className="mt-3 text-sm text-gray-700 list-disc ml-5 space-y-1">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.quantity} × Product{" "}
                    <span className="font-mono">{item.productId}</span> — $
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>

              <div className="mt-3 font-semibold text-purple-1 text-right">
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
