"use client";

import { ContactMessage } from "@/lib/action";
import clsx from "clsx";
import React, { useActionState } from "react";

type ContactError = {
  name?: string[];
  email?: string[];
  subject?: string[];
  message?: string[];
};

const ContactForm = () => {
  const [state, formAction, isPending] = useActionState(ContactMessage, null);
  const error = state?.error as ContactError;
  return (
    <div className="bg-white p-8 rounded-sm shadow-sm">
      {state?.message ? (
        <div
          className="p-4 mb-4 text-gray-800 rounded-lg bg-green-50"
          role="alert"
        >
          <div className="font-medium">{state.message}</div>
        </div>
      ) : (
        <></>
      )}
      <form action={formAction}>
        <div className="grid md:grid-cols-2 gap-7 mt-6">
          <div className="">
            <input
              type="text"
              name="name"
              className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
              placeholder="Name"
            />
            <div className="" aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500  mt-2">{error?.name}</p>
            </div>
          </div>
          <div className="">
            <input
              type="email"
              name="email"
              className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
              placeholder="jhonedoe@example.com"
            />
            <div className="" aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500  mt-2">{error?.email}</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <input
              type="text"
              name="subject"
              className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
              placeholder="Subject*"
            />
            <div className="" aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500  mt-2">{error?.subject}</p>
            </div>
          </div>
          <div className="md:col-span-2">
            <textarea
              name="message"
              rows={5}
              className="bg-gray-50 p-3 border border-gray-200 rounded-sm w-full font-light"
              placeholder="Your Message"
            ></textarea>
            <div className="" aria-live="polite" aria-atomic="true">
              <p className="text-sm text-red-500  mt-1">{error?.message}</p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className={clsx(
            "mt-4 px-10 py-4 text-center font-semibold text-white w-full bg-orange-400 rounded-sm hover:bg-orange-500 cursor-pointer",
            {
              "opacity-50 cursor-progress animate-pulse": isPending,
            }
          )}
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
