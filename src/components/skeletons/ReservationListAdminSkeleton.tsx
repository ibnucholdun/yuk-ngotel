import React from "react";

const ReservationListAdminSkeleton = () => {
  return (
    <div className="bg-white p-4 mt-5 shadow-sm">
      <div className="w-full">
        {/* Table Header */}
        <div className="flex gap-4 mb-4 border-b pb-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded w-full"></div>
          ))}
        </div>

        {/* Table Rows */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4 mb-4 items-center">
            <div className="h-20 w-32 bg-gray-200 rounded flex-shrink-0"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationListAdminSkeleton;
