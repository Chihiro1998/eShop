"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import MyProfileSection from "./MyProfileSection";
import OrdersSection from "./OrdersSection";
import Wishlist from "./WishlistSection";

const AccountPage = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-purple-3 text-white py-20 px-6 rounded-2xl shadow-md mt-6 max-w-7xl mx-auto">
        <h1 className="text-4xl text-center font-[Pacifico]">
          ✨ Your Perfect Style is <br /> Just a Click Away! ✨
        </h1>
        <p className="mt-2 text-center text-[1rem] text-gray-300">
          Welcome to E-shop — find your own style and goods here!
        </p>
      </div>

      {/* Layout */}
      <section className="max-w-7xl mx-auto px-6 py-10 flex gap-10">
        {/* Sidebar */}
        <aside className="w-1/4 pr-6 border-r border-gray-300">
          <nav className="flex flex-col space-y-4 text-purple-1 font-medium">
            <button
              onClick={() => setActiveTab("overview")}
              className="text-left  hover:text-purple-2"
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className="text-left  hover:text-purple-2"
            >
              My Profile
            </button>
            <button
              onClick={() => setActiveTab("wishlist")}
              className="text-left  hover:text-purple-2"
            >
              My Wishlist
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className="text-left  hover:text-purple-2"
            >
              My Orders
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className="text-left hover:text-purple-2"
            >
              Address Book
            </button>

            <SignOutButton>
              <span className=" hover:text-purple-2 text-purple-1 cursor-pointer text-left">
                Log Out
              </span>
            </SignOutButton>
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === "wishlist" && <Wishlist />}
          {activeTab === "profile" && <MyProfileSection />}
          {activeTab === "orders" && <OrdersSection />}
          {activeTab === "overview" && (
            <div>
              <h2 className="text-2xl font-[Pacifico] text-purple-1 mb-4">
                💜Welcome to E-Shop, {user?.firstName || "User"}!
              </h2>
              <p className="text-gray-600">
                This is your personal space. You can view and manage your
                wishlist, orders, addresses, and more!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AccountPage;
