import DashboardCards from "@/components/admin/DashboardCards";
import ReservationList from "@/components/admin/ReservationList";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard Admin",
  description: "Dashboard Admin",
};

const DashboardAdminPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardCards />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <ReservationList />
      </Suspense>
    </div>
  );
};

export default DashboardAdminPage;
