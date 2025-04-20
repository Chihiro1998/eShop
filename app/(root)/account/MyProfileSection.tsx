"use client";

import { UserProfile, useUser } from "@clerk/nextjs";
import { useState } from "react";

const MyProfileSection = () => {
  const { user } = useUser();
  const [showEditForm, setShowEditForm] = useState(false);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-[Pacifico] text-purple-1 mb-2">
        💜Welcome to E-Shop, {user?.firstName || "User"}!
      </h2>
      <p className="text-gray-600">
        This is your personal space. You can view and manage your wishlist,
        orders, addresses, and more!
      </p>

      {!showEditForm ? (
        <>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-gray-600 text-sm">
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowEditForm(true)}
            className="inline-block bg-purple-1 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-2 transition"
          >
            Edit My Account
          </button>
        </>
      ) : (
        <div className="">
          <UserProfile routing="hash" />
          <button
            onClick={() => setShowEditForm(false)}
            className="mt-4 text-sm text-purple-1 underline"
          >
            Back to Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProfileSection;
