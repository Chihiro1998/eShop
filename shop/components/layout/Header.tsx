"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiHeart, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const { isSignedIn } = useUser();

  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  return (
    <header className="sticky top-0 bg-white shadow z-50 font-roboto">
      <nav className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link href="/" className="ml-8">
          <Image src="/logo.png" alt="E-Shop Logo" width={120} height={50} />
        </Link>

        {/* Search */}
        <form className="flex items-center w-full max-w-xl bg-gray-100 px-4 py-2 rounded-full mx-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-transparent text-sm outline-none"
          >
            <option value="All Categories">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Clothes">Clothes</option>
          </select>

          <input
            type="search"
            placeholder="Search on E-Shop..."
            className="flex-1 bg-transparent outline-none ml-4 text-sm"
          />

          <button type="submit" className="text-lg text-gray-600">
            <FiSearch />
          </button>
        </form>

        {/* Right icons */}
        <div className="flex items-center gap-4 mr-8 relative">
          <Link href="/cart" className="text-2xl text-gray-700">
            <FiShoppingCart />
          </Link>

          <span className="text-gray-400">|</span>

          {/* User Dropdown */}
          <div className="relative">
            <button onClick={toggleUserMenu} className="text-2xl text-gray-700">
              <FiUser />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-10 bg-white shadow-lg rounded-md px-4 py-2 flex flex-col z-10 min-w-[140px]">
                {isSignedIn ? (
                  <>
                    <Link
                      href="/account"
                      className="py-1 text-sm text-gray-700"
                    >
                      Account
                    </Link>
                    <SignOutButton>
                      <span className="py-1 text-sm text-gray-700 cursor-pointer block">
                        Log Out
                      </span>
                    </SignOutButton>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      className="py-1 text-sm text-gray-700"
                    >
                      Log In
                    </Link>
                    <Link
                      href="/sign-up"
                      className="py-1 text-sm text-gray-700"
                    >
                      Register
                    </Link>

                    <Link
                      href="/wishlist"
                      className="py-1 text-sm text-gray-700 flex items-center gap-1"
                    >
                      <FiHeart className="text-purple-1" /> Wishlist
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
