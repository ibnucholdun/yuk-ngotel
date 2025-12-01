import { Metadata } from "next";
import React from "react";
import { auth } from "../../../../auth";
import Image from "next/image";

export const metadata: Metadata = {
  title: "My Profile",
  description: "User Profile",
};

const ProfilePage = async () => {
  const session = await auth();

  if (!session || !session.user) return null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">Manage your account information.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative w-24 h-24">
            <Image
              src={session.user.image || "/avatar.svg"}
              alt="Profile"
              fill
              className="rounded-full object-cover border-4 border-gray-50"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {session.user.name}
            </h2>
            <p className="text-gray-500">{session.user.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-600 text-xs font-semibold rounded-full uppercase">
              {session.user.role}
            </span>
          </div>
        </div>

        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={session.user.name || ""}
              disabled
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={session.user.email || ""}
              disabled
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
