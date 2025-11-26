"use client";

import { type ReservationProps } from "@/types/reservation";
import clsx from "clsx";
import React, { useTransition } from "react";

declare global {
  interface Window {
    snap: {
      pay: (token: string) => void;
    };
  }
}

const PaymentButton = ({ reservation }: { reservation: ReservationProps }) => {
  const [isPending, startTransition] = useTransition();
  const handlePayment = async () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/payment`, {
          method: "POST",
          body: JSON.stringify(reservation),
        });

        const { token } = await response.json();

        if (token) {
          window.snap.pay(token);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isPending}
      className={clsx(
        "px-10 py-4 mt-2 text-center font-semibold text-white w-full bg-orange-400 rounded-sm hover:bg-orange-500 cursor-pointer",
        { "opacity-50 cursor-progress animate-pulse": isPending }
      )}
    >
      {isPending ? "Processing..." : "Process Payment"}
    </button>
  );
};

export default PaymentButton;
