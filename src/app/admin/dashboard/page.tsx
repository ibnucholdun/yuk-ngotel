import DashboardCards from "@/components/admin/DashboardCards";
import ReservationList from "@/components/admin/ReservationList";
import DashboardCardSkeleton from "@/components/skeletons/DashboardCardSkeleton";
import ReservationListAdminSkeleton from "@/components/skeletons/ReservationListAdminSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard Admin",
  description: "Dashboard Admin",
};

const DashboardAdminPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const page = Number((await searchParams).page) || 1;
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
      <Suspense fallback={<DashboardCardSkeleton />}>
        <DashboardCards />
      </Suspense>
      <Suspense fallback={<ReservationListAdminSkeleton />}>
        <ReservationList page={page} />
      </Suspense>
    </div>
  );
};

export default DashboardAdminPage;
