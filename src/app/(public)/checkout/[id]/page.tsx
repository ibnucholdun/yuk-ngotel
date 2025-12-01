import CheckoutDetail from "@/components/CheckoutDetail";
import { Metadata } from "next";
import Script from "next/script";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Reservation Summary",
  description: "Reservation Summary",
};

const CheckoutDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const reservationId = (await params).id;
  return (
    <div className="max-w-7xl px-4 mx-auto py-20 mt-12">
      <h1 className="text-2xl font-semibold mb-8">Reservation Summary</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutDetail reservationId={reservationId} />
      </Suspense>

      {/* if production remove .sandbox */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
    </div>
  );
};

export default CheckoutDetailPage;
