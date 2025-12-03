import React from "react";

const ReservationDetailSkeleton = () => {
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-sm shadow animate-pulse">
      <div className="grid md:grid-cols-2 md:gap-5">
        <ul>
          {[...Array(4)].map((_, i) => (
            <li key={i} className="py-2">
              <div className="flex items-center">
                <div className="flex-1 min-w-0 ms-4">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
              </div>
            </li>
          ))}
        </ul>
        <ul>
          {[...Array(3)].map((_, i) => (
            <li key={i} className="py-2">
              <div className="flex items-center">
                <div className="flex-1 min-w-0 ms-4">
                  <div className="h-4 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Table Skeleton */}
      <div className="relative over-x-auto mt-3 py-6">
        <div className="w-full">
          <div className="h-10 bg-gray-50 mb-2 rounded"></div>
          <div className="h-16 bg-white border-b mb-2 rounded"></div>
          <div className="flex justify-end mt-2">
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="mt-4 flex justify-end">
        <div className="w-full md:w-auto">
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailSkeleton;
