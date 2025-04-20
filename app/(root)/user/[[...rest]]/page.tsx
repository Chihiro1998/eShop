"use client";

import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <UserProfile />
    </div>
  );
}
