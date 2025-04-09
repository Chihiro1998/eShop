"use client"

import { Separator } from "@/components/ui/separator";
import { Pacifico } from "next/font/google";
import { useEffect, useState } from "react";
import { OrderType } from "@/lib/types";
import { columns } from "@/components/orders/OrderColumns";
import { DataTable } from "@/components/custom ui/DataTable";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function Orders() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.log("[orders_GET]", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="px-10 py-5">
      <div className="flex justify-between items-center">
        <p className={`${pacifico.className} text-[32px] text-purple-1 mb-2`}>Orders</p>
      </div>
      <Separator className="bg-grey-1 mt-4 mb-7" />
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  );
}

