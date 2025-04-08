"use client"

import { Separator } from "@/components/ui/separator";
import { Pacifico } from "next/font/google";
import { useEffect, useState } from "react";
import { UserType } from "@/lib/types";
import { columns } from "@/components/customers/CustomerColumns";
import { DataTable } from "@/components/custom ui/DataTable";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});

export default function Customers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.log("[users_GET]", err);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="px-10 py-5">
      <div className="flex justify-between items-center">
        <p className={`${pacifico.className} text-[32px] text-purple-1 mb-2`}>Customers</p>
      </div>
      <Separator className="bg-grey-1 mt-4" />
      <DataTable columns={columns} data={users} searchKey="clerkId" />
    </div>
  );
}

