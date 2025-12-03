"use client";

import { subscribeNewsletter } from "@/lib/action";
import Image from "next/image";
import Link from "next/link";
import React, { useActionState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Footer = () => {
  const [state, formAction, isPending] = useActionState(
    subscribeNewsletter,
    null
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
    }
    if (state?.error?.email) {
      toast.error(state.error.email[0]);
    }
  }, [state]);

  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 w-full py-10 md:py-16">
        <div className="grid md:grid-cols-3 gap-7">
          <div className="">
            <Link href="/" className="mb-10 block">
              <Image
                src="/logo.png"
                alt="logo"
                width={128}
                height={49}
                priority
              />
            </Link>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
              hic ea quos animi sed necessitatibus?
            </p>
          </div>
          <div className="">
            <div className="flex gap-20">
              <div className="flex-1 md:flex-none">
                <h4 className="mb-8 text-xl font-semibold text-white">Links</h4>
                <ul className="list-item space-y-5 text-gray-400">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about">About</Link>
                  </li>
                  <li>
                    <Link href="/room">Rooms</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              <div className="flex-1 md:flex-none">
                <h4 className="mb-8 text-xl font-semibold text-white">Legal</h4>
                <ul className="list-item space-y-5 text-gray-400">
                  <li>
                    <Link href="#">Home</Link>
                  </li>
                  <li>
                    <Link href="#">Term & Conditions</Link>
                  </li>
                  <li>
                    <Link href="#">Payment Method</Link>
                  </li>
                  <li>
                    <Link href="#">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="">
            <h4 className="mb-8 text-xl font-semibold text-white">
              Newsletter
            </h4>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </p>
            <form action={formAction} className="mt-5">
              <div className="mb-5">
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="w-full p-3 rounded-sm bg-white"
                  placeholder="jhondoe@gmail.com"
                />
                <div aria-live="polite" aria-atomic="true">
                  <p className="text-sm text-red-500 mt-2">
                    {state?.error?.email}
                  </p>
                </div>
              </div>
              <button
                disabled={isPending}
                className="bg-orange-400 p-3 font-bold text-white w-full text-center rounded-sm hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 border-t border-gray-500 py-8 text-center text-base text-gray-500">
        &copy; {new Date().getFullYear()} |Ichol Digital | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
