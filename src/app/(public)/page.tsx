import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Facilities from "@/components/Facilities";
import Testimonials from "@/components/Testimonials";
import React, { Suspense } from "react";
import RoomSkeleton from "@/components/skeletons/RoomSkeleton";

const HomePage = () => {
  return (
    <div>
      <Hero />

      <Facilities />

      <div className="mt-16 mb-20">
        <div className="text-center mb-12 px-4">
          <h1 className="text-3xl md:text-5xl font-bold uppercase text-gray-800 mb-4">
            Rooms & Rates
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our luxurious rooms and suites, designed for your ultimate
            comfort and relaxation. Choose the perfect space for your stay.
          </p>
        </div>
        <Suspense fallback={<RoomSkeleton />}>
          <Main limit={6} />
        </Suspense>
      </div>

      <Testimonials />
    </div>
  );
};

export default HomePage;
