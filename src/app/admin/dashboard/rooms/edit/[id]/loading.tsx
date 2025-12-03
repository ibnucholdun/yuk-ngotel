import React from "react";

const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto animate-pulse">
      <div className="h-10 w-48 bg-gray-200 rounded mb-4"></div>

      <div className="grid md:grid-cols-12 gap-5">
        {/* Left Column (Form Fields) */}
        <div className="col-span-8 bg-white p-4">
          {/* Room Name */}
          <div className="mb-4">
            <div className="h-10 w-full bg-gray-200 rounded-sm"></div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <div className="h-48 w-full bg-gray-200 rounded-sm"></div>
          </div>

          {/* Amenities */}
          <div className="mb-4 grid md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Image & Details) */}
        <div className="col-span-4 bg-white p-4">
          {/* Image Upload Area */}
          <div className="mb-4 aspect-video bg-gray-200 rounded-md"></div>

          {/* Capacity */}
          <div className="mb-4">
            <div className="h-10 w-full bg-gray-200 rounded-sm"></div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="h-10 w-full bg-gray-200 rounded-sm"></div>
          </div>

          {/* Submit Button */}
          <div className="h-12 w-full bg-gray-200 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
