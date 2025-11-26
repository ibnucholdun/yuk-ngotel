import { prisma } from "@/lib/prisma";
import { PaymentProps } from "@/types/payment";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const data: PaymentProps = await req.json();
  const reservationId = data.order_id;

  let responseData = null;

  const transactionStatus = data.transaction_status;
  const paymentType = data.payment_type;
  const fraudStatus = data.fraud_status;
  const statusCode = data.status_code;
  const grossAmount = data.gross_amount;
  const signatureKey = data.signature_key;

  const hash = crypto
    .createHash("sha512")
    .update(
      `${reservationId}${statusCode}${grossAmount}${process.env.MIDTRANS_SERVER_KEY}`
    )
    .digest("hex");

  if (signatureKey !== hash) {
    return NextResponse.json(
      { error: "Invalid signature key" },
      { status: 400 }
    );
  }

  if (transactionStatus == "capture") {
    if (fraudStatus == "accept") {
      const transaction = await prisma.payment.update({
        where: {
          id: reservationId,
        },
        data: {
          method: paymentType,
          status: "paid",
        },
      });

      responseData = transaction;
    }
  } else if (transactionStatus == "settlement") {
    const transaction = await prisma.payment.update({
      where: {
        id: reservationId,
      },
      data: {
        method: paymentType,
        status: "paid",
      },
    });
  } else if (
    transactionStatus == "cancel" ||
    transactionStatus == "expire" ||
    transactionStatus == "deny"
  ) {
    const transaction = await prisma.payment.update({
      where: {
        id: reservationId,
      },
      data: {
        method: paymentType,
        status: "failure",
      },
    });
  } else if (transactionStatus == "pending") {
    const transaction = await prisma.payment.update({
      where: {
        id: reservationId,
      },
      data: {
        method: paymentType,
        status: "pending",
      },
    });
  }

  return NextResponse.json({ responseData }, { status: 200 });
};
