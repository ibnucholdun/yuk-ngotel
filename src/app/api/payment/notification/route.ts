import { prisma } from "@/lib/prisma";
import { PaymentProps } from "@/types/payment";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const data: PaymentProps = await req.json();

    const {
      order_id: reservationId,
      transaction_status,
      payment_type,
      fraud_status,
      status_code,
      gross_amount,
      signature_key,
    } = data;

    const payment = await prisma.payment.findUnique({
      where: { reservationId },
    });

    if (!payment) {
      console.log("❌ Payment NOT FOUND for reservationId:", reservationId);

      return NextResponse.json(
        {
          error: "Payment not found",
        },
        { status: 404 }
      );
    }

    const hash = crypto
      .createHash("sha512")
      .update(
        `${reservationId}${status_code}${gross_amount}${process.env.MIDTRANS_SERVER_KEY}`
      )
      .digest("hex");

    if (signature_key !== hash) {
      console.log("❌ Signature mismatch");
      return NextResponse.json(
        { error: "Invalid signature key" },
        { status: 400 }
      );
    }

    let newStatus = payment.status;

    if (transaction_status === "capture") {
      newStatus = fraud_status === "accept" ? "paid" : "failure";
    } else if (transaction_status === "settlement") {
      newStatus = "paid";
    } else if (transaction_status === "pending") {
      newStatus = "pending";
    } else if (["cancel", "expire", "deny"].includes(transaction_status)) {
      newStatus = "failure";
    }

    const updated = await prisma.payment.update({
      where: { reservationId },
      data: {
        method: payment_type ?? null,
        status: newStatus,
      },
    });

    return NextResponse.json(
      { message: "Notification processed", data: updated },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("🔥 MIDTRANS CALLBACK ERROR:", err);
    return NextResponse.json(
      { error: "Internal error", details: (err as Error).message },
      { status: 500 }
    );
  }
};
