import { Metadata } from "next";
import React from "react";
import { auth } from "../../../../auth";
import { prisma } from "@/lib/prisma";
import ProfileForm from "@/components/dashboard/ProfileForm";

export const metadata: Metadata = {
  title: "My Profile",
  description: "User Profile",
};

const ProfilePage = async () => {
  const session = await auth();

  if (!session || !session.user || !session.user.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600">Manage your account information.</p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
        <ProfileForm user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
