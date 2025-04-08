"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const AccountPage = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-purple-1 text-white py-20 px-6 rounded-2xl shadow-md mt-6  max-w-7xl mx-auto">
        <h1 className="text-4xl text-center font-[Pacifico]">
          ✨ Your Perfect Style is <br /> Just a Click Away! ✨
        </h1>
        <p
          className=" mt-2 text-center
          className={`${roboto.className} text-[1rem] text-gray-300"
        >
          {" "}
          Welcome to E-shop — find your own style and goods here!
        </p>
      </div>

      {/* Main Layout */}
      <section className="max-w-7xl mx-auto px-6 py-10 flex gap-10">
        {/* Sidebar */}
        <aside className="w-1/4 pr-6 border-r border-gray-300">
          <nav className="flex flex-col items-left space-y-4 text-purple-1 font-medium">
            <Link href="/account" className="hover:underline">
              Overview
            </Link>
            <Link href="/account" className="hover:underline">
              My Profile
            </Link>
            <Link href="/wishlist" className="hover:underline">
              My Wishlist
            </Link>
            <Link href="/orders" className="hover:underline">
              My Orders
            </Link>
            <Link href="/account/addresses" className="hover:underline">
              Address Book
            </Link>
            <SignOutButton>
              <span className="hover:underline text-purple-1 cursor-pointer text-left">
                Log Out
              </span>
            </SignOutButton>
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1">
          <h2 className="text-2xl font-[Pacifico] text-purple-1 mb-4">
            💜Welcome to E-Shop, {user?.firstName || "User"}!
          </h2>
          <p className="text-gray-600">
            This is your personal space. You can view and manage your wishlist,
            orders, addresses, and more!
          </p>
        </div>
      </section>
    </div>
  );
};

export default AccountPage;
