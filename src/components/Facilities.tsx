import React from "react";
import { FaWifi, FaSwimmingPool, FaUtensils, FaHeadset } from "react-icons/fa";

import { getAllAmenities } from "@/lib/data";
import {
  FaParking,
  FaTv,
  FaSnowflake,
  FaDumbbell,
  FaSpa,
  FaCoffee,
  FaConciergeBell,
} from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

const iconMap: { [key: string]: React.ReactNode } = {
  wifi: <FaWifi className="text-4xl text-orange-500" />,
  pool: <FaSwimmingPool className="text-4xl text-orange-500" />,
  "swimming pool": <FaSwimmingPool className="text-4xl text-orange-500" />,
  restaurant: <FaUtensils className="text-4xl text-orange-500" />,
  dining: <FaUtensils className="text-4xl text-orange-500" />,
  support: <FaHeadset className="text-4xl text-orange-500" />,
  "24/7 support": <FaHeadset className="text-4xl text-orange-500" />,
  parking: <FaParking className="text-4xl text-orange-500" />,
  tv: <FaTv className="text-4xl text-orange-500" />,
  ac: <FaSnowflake className="text-4xl text-orange-500" />,
  "air conditioning": <FaSnowflake className="text-4xl text-orange-500" />,
  gym: <FaDumbbell className="text-4xl text-orange-500" />,
  fitness: <FaDumbbell className="text-4xl text-orange-500" />,
  spa: <FaSpa className="text-4xl text-orange-500" />,
  breakfast: <FaCoffee className="text-4xl text-orange-500" />,
  service: <FaConciergeBell className="text-4xl text-orange-500" />,
};

const Facilities = async () => {
  const amenities = await getAllAmenities();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Facilities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the best services and amenities designed to make your
            stay comfortable and memorable.
          </p>
        </div>

        {amenities && amenities.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {amenities.map((amenity) => {
              const icon = iconMap[amenity.name.toLowerCase()] ||
                Object.entries(iconMap).find(([key]) =>
                  amenity.name.toLowerCase().includes(key)
                )?.[1] || <FaCheck className="text-4xl text-orange-500" />;

              return (
                <div
                  key={amenity.id}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group border border-gray-100"
                >
                  <div className="mb-4 p-4 bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors duration-300">
                    {icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 capitalize">
                    {amenity.name}
                  </h3>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No specific facilities listed at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default Facilities;
