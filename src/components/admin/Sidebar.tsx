"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  FaBed,
  FaChartLine,
  FaSignOutAlt,
  FaEnvelope,
  FaUsers,
  FaUserCog,
} from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <FaChartLine /> },
    { href: "/admin/dashboard/rooms", label: "Manage Rooms", icon: <FaBed /> },
    {
      href: "/admin/dashboard/contact",
      label: "Messages",
      icon: <FaEnvelope />,
    },
    {
      href: "/admin/dashboard/subscribers",
      label: "Subscribers",
      icon: <FaUsers />,
    },
    {
      href: "/admin/dashboard/users",
      label: "User Management",
      icon: <FaUserCog />,
    },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col fixed left-0 top-0 bottom-0 z-50">
      <div className="mb-8 mt-4">
        <h2 className="text-2xl font-bold text-center text-orange-500">
          Yuk Ngotel
        </h2>
        <p className="text-center text-gray-400 text-sm">Admin Dashboard</p>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin/dashboard" &&
                pathname.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "hover:bg-gray-800 text-gray-300"
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 transition-colors"
        >
          <FaSignOutAlt className="text-xl" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
