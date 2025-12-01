import Midtrans from "midtrans-client";
import { prisma } from "@/lib/prisma";
import { type ReservationProps } from "@/types/reservation";
import { NextResponse } from "next/server";

const snap = new Midtrans.Snap({
  isProduction: false, // if production change to true
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
});

export const POST = async (req: Request) => {
  const reservation: ReservationProps = await req.json();
  const newOrderId = `${reservation.id}_${Math.round(Date.now() / 1000)}`;
  const existingPayment = await prisma.payment.findUnique({
    where: { reservationId: reservation.id },
  });

  if (existingPayment?.orderId) {
    try {
      console.log(
        `Attempting to cancel previous order: ${existingPayment.orderId}`
      );
      await snap.transaction.cancel(existingPayment.orderId);
      console.log(
        `Successfully cancelled previous order: ${existingPayment.orderId}`
      );
    } catch (error) {
      console.log(
        `Failed to cancel previous order (might be already expired/settled):`,
        error
      );
    }
  }

  // 4. Update Order ID baru ke Database
  await prisma.payment.update({
    where: { reservationId: reservation.id },
    data: {
      orderId: newOrderId,
    },
  });

  const params = {
    transaction_details: {
      order_id: newOrderId,
      gross_amount: reservation.payments?.amount || 0,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: reservation.User.name,
      email: reservation.User.email,
      phone: reservation.User.phone || undefined,
    },
  };

  const token = await snap.createTransactionToken(params);

  return NextResponse.json({ token });
};
