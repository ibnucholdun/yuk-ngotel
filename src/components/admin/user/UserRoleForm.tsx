"use client";

import { updateUserRole } from "@/lib/action";
import { useTransition } from "react";

export default function UserRoleForm({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    startTransition(async () => {
      await updateUserRole(userId, newRole);
    });
  };

  return (
    <select
      value={currentRole}
      onChange={handleChange}
      disabled={isPending}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
        isPending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
  );
}
