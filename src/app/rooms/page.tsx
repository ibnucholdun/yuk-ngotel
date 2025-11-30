import FAQ from "@/components/FAQ";
import HeaderSection from "@/components/HeaderSection";
import Main from "@/components/Main";
import Newsletter from "@/components/Newsletter";
import RoomSkeleton from "@/components/skeletons/RoomSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Rooms & Rates",
  description: "Choose your best room today",
};

const RoomPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderSection
        title="Our Luxurious Rooms"
        subtitle="Experience comfort and elegance in every detail."
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Find Your Perfect Stay
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our wide selection of rooms, from cozy singles to
            spacious suites. All designed with your comfort in mind.
          </p>
        </div>

        <Suspense fallback={<RoomSkeleton />}>
          <Main limit={9} page={currentPage} />
        </Suspense>
      </div>

      <FAQ />
      <Newsletter />
    </div>
  );
};

export default RoomPage;
