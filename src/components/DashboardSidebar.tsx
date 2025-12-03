"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaHistory, FaUser, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";

const links = [
  { href: "/my-dashboard", label: "Overview", icon: <FaHome /> },
  {
    href: "/my-dashboard/my-reservation",
    label: "My Reservations",
    icon: <FaHistory />,
  },
  { href: "/my-dashboard/profile", label: "Profile", icon: <FaUser /> },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 hidden md:flex flex-col fixed h-screen top-0 left-0 pt-20 z-10">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
      </div>
      <nav className="mt-6 px-4 space-y-2 flex-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-orange-50 text-orange-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <span className="text-lg">
            <FaSignOutAlt />
          </span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
