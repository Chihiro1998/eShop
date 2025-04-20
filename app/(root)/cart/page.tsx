"use client";

import React from "react";
import useCart from "@/lib/hooks/useCart";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Cart = () => {
  const { user } = useUser();
  const router = useRouter();
  const { cartItems, incrementItem, decrementItem, removeItem } = useCart();

  const total = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      if (!user) {
        router.push("sign-in");
      } else {
        const customer = { clerkId: user.id };
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItems: cartItems,
            customer: customer,
          }),
        });

        const data = await res.json();
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="p-8 flex flex-col gap-6">
      <h1 className="text-4xl font-bold mb-6">My Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-400">No Items</p>
      ) : (
        <>
          {cartItems.map((cartItem) => (
            <div
              key={cartItem.item._id}
              className="border p-6 flex items-center justify-between min-h-[150px] relative"
            >
              <button
                onClick={() => removeItem(cartItem.item._id)}
                className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
              <div className="flex items-center gap-6">
                <div className="w-40 h-40 relative">
                  <Image
                    src={cartItem.item.media?.[0]}
                    alt={cartItem.item.title}
                    fill
                    className="object-contain rounded"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{cartItem.item.title}</h2>
                  <p className="text-gray-600 text-lg">${cartItem.item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => decrementItem(cartItem.item._id)}
                  className="bg-gray-200 px-4 py-2 text-xl rounded"
                >
                  –
                </button>
                <span className="text-xl">{cartItem.quantity}</span>
                <button
                  onClick={() => incrementItem(cartItem.item._id)}
                  className="bg-gray-200 px-4 py-2 text-xl rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-end items-center gap-4 mt-4">
            <span className="text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </span>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-6 py-2 rounded text-xl"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;


