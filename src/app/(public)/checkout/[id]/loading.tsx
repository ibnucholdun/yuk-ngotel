import React from "react";

const Loading = () => {
  return (
    <div className="max-w-7xl px-4 mx-auto py-20 mt-12 animate-pulse">
      {/* Title Skeleton */}
      <div className="h-8 w-64 bg-gray-200 rounded mb-8"></div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Right Column (Room Info & Payment) - order-2 */}
        <div className="order-2">
          {/* Room Card Skeleton */}
          <div className="flex flex-col mb-3 items-start bg-white border border-gray-200 rounded-sm md:flex-row md:w-full">
            {/* Image */}
            <div className="w-full md:w-[500px] aspect-video bg-gray-200 md:rounded-s-sm"></div>

            {/* Content */}
            <div className="flex flex-col justify-between p-4 w-full space-y-4">
              <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Payment Button Skeleton */}
          <div className="h-12 w-full bg-gray-200 rounded mt-4"></div>
        </div>

        {/* Left Column (Details Table) */}
        <div className="border border-gray-200 px-3 py-5 bg-white rounded-sm">
          <div className="space-y-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
