"use client";

import React from "react";
import useCart from "@/lib/hooks/useCart";
import Image from "next/image";

const Cart = () => {
    const { cartItems, incrementItem, decrementItem } = useCart();

    return (
        <div className="p-8 flex flex-col gap-6">
            <h1 className="text-4xl font-bold mb-6">My Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-400">No Items</p>
            ) : (
                cartItems.map((cartItem) => (
                    <div
                        key={cartItem.item._id}
                        className="border p-6 flex items-center justify-between min-h-[150px]"
                    >
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
                                <h2 className="text-2xl font-semibold">
                                    {cartItem.item.title}
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    ${cartItem.item.price}
                                </p>
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
                ))
            )}
        </div>
    );
};

export default Cart;
