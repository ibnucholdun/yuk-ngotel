import MyReservationList from "@/components/MyReservationList";
import { Metadata } from "next";
import React from "react";
import { auth } from "../../../../auth";

export const metadata: Metadata = {
  title: "My Reservation",
  description: "My Reservation History",
};

const MyReservationPage = async () => {
  const session = await auth();

  if (!session || !session.user) return null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Reservations</h1>
        <p className="text-gray-600">View and manage your booking history.</p>
      </div>
      <div className="rounded-sm">
        <MyReservationList />
      </div>
    </div>
  );
};

export default MyReservationPage;
