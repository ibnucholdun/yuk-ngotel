"use client";

import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

const Navlink = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <div className="flex items-center justify-end md:order-2 gap-x-4">
          <div className="hidden text-sm bg-gray-50 border rounded-full md:me-0 md:block focus:ring-4 focus:ring-gray-300">
            <Image
              className="size-8 rounded-full"
              src={session.user.image || "/avatar.svg"}
              alt="profile"
              width={64}
              height={64}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100"
      >
        {!open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
      </button>
      <div className={clsx("w-full md:block md:w-auto ", { hidden: !open })}>
        <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm bg-gray-50 md:flex-row md:items-center md:space-x-10 md:p-0 md:mt-0 md:border-0 md:bg-white">
          <li>
            <Link
              href="/"
              className={clsx(
                "block py-2 px-3 rounded-sm md:p-0",
                pathname === "/"
                  ? "text-orange-500 font-bold"
                  : "text-gray-800 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500"
              )}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={clsx(
                "block py-2 px-3 rounded-sm md:p-0",
                pathname.startsWith("/about")
                  ? "text-orange-500 font-bold"
                  : "text-gray-800 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500"
              )}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/rooms"
              className={clsx(
                "block py-2 px-3 rounded-sm md:p-0",
                pathname.startsWith("/rooms")
                  ? "text-orange-500 font-bold"
                  : "text-gray-800 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500"
              )}
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={clsx(
                "block py-2 px-3 rounded-sm md:p-0",
                pathname.startsWith("/contact")
                  ? "text-orange-500 font-bold"
                  : "text-gray-800 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500"
              )}
            >
              Contact
            </Link>
          </li>
          {session && (
            <>
              {/* Desktop: Single Link to Dashboard */}
              <li className="hidden md:block">
                <Link
                  href="/my-dashboard"
                  className={clsx(
                    "block py-2 px-3 rounded-sm md:p-0",
                    pathname.startsWith("/my-dashboard")
                      ? "text-orange-500 font-bold"
                      : "text-gray-800 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500"
                  )}
                >
                  My Dashboard
                </Link>
              </li>

              {/* Mobile: Dashboard Menu Items */}
              <li className="md:hidden border-t border-gray-200 my-2 pt-2">
                <span className="block px-3 text-xs font-bold text-gray-500 uppercase mb-2">
                  Dashboard
                </span>
              </li>
              <li className="md:hidden">
                <Link
                  href="/my-dashboard"
                  className={clsx(
                    "block py-2 px-3 rounded-sm",
                    pathname === "/my-dashboard"
                      ? "text-orange-500 font-bold"
                      : "text-gray-800 hover:bg-gray-100"
                  )}
                >
                  Overview
                </Link>
              </li>
              <li className="md:hidden">
                <Link
                  href="/my-dashboard/my-reservation"
                  className={clsx(
                    "block py-2 px-3 rounded-sm",
                    pathname.startsWith("/my-dashboard/my-reservation")
                      ? "text-orange-500 font-bold"
                      : "text-gray-800 hover:bg-gray-100"
                  )}
                >
                  My Reservations
                </Link>
              </li>
              <li className="md:hidden">
                <Link
                  href="/my-dashboard/profile"
                  className={clsx(
                    "block py-2 px-3 rounded-sm",
                    pathname.startsWith("/my-dashboard/profile")
                      ? "text-orange-500 font-bold"
                      : "text-gray-800 hover:bg-gray-100"
                  )}
                >
                  Profile
                </Link>
              </li>
              <li className="md:hidden">
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-sm"
                >
                  Sign Out
                </button>
              </li>
            </>
          )}
          {!session && (
            <li className="pt-2 md:pt-0">
              <Link
                href="/sign-in"
                className="py-2.5 px-6 bg-orange-400 hover:bg-orange-500 rounded-sm"
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navlink;
