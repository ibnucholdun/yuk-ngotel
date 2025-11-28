import Midtrans from "midtrans-client";
import { type ReservationProps } from "@/types/reservation";
import { NextResponse } from "next/server";

const snap = new Midtrans.Snap({
  isProduction: false, // if production change to true
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export const POST = async (req: Request) => {
  const reservation: ReservationProps = await req.json();

  const params = {
    transaction_details: {
      order_id: `${reservation.id}_${Math.round(Date.now() / 1000)}`,
      gross_amount: reservation.payments?.amount || 0,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: reservation.User.name,
      email: reservation.User.email,
    },
  };

  const token = await snap.createTransactionToken(params);

  return NextResponse.json({ token });
};
