import ReservationDetailSkeleton from "@/components/skeletons/ReservationDetailSkeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto mt-10 py-20 px-4">
        <ReservationDetailSkeleton />
      </div>
    </div>
  );
};

export default Loading;
