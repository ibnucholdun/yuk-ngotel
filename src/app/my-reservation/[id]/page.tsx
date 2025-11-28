import ReservationDetail from "@/components/ReservationDetail";
import { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "My Reservation Detail",
  description: "My Reservation Detail",
};

const MyReservationDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const reservationId = (await params).id;
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto mt-10 py-20 px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <ReservationDetail reservationId={reservationId} />
        </Suspense>

        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="lazyOnload"
        />
      </div>
    </div>
  );
};

export default MyReservationDetailPage;
