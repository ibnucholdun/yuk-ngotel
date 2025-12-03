import React from "react";

const Loading = () => {
  return (
    <div className="mt-16 max-w-7xl mx-auto py-16 px-4 grid lg:grid-cols-12 gap-8 animate-pulse">
      {/* Left Column */}
      <div className="md:col-span-8">
        {/* Image Skeleton */}
        <div className="w-full aspect-video bg-gray-200 rounded-sm mb-8"></div>

        {/* Title Skeleton */}
        <div className="h-12 w-3/4 bg-gray-200 rounded mb-8"></div>

        {/* Description Skeleton */}
        <div className="space-y-3 mb-8">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>

        {/* Amenities Skeleton */}
        <div className="h-7 w-32 bg-gray-200 rounded mt-1 mb-4"></div>
        <div className="grid md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-2 items-center">
              <div className="size-5 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column (Sidebar) */}
      <div className="md:col-span-4">
        <div className="border-2 border-gray-200 border-dashed px-3 py-5 bg-slate-50 rounded-md">
          {/* Price & Capacity Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className="size-4 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
              <div className="h-4 w-10 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Form Skeleton */}
          <div className="space-y-4">
            <div className="h-10 w-full bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
            <div className="h-12 w-full bg-gray-200 rounded mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
