import { formatCurrency } from "@/lib/utils";
import { Room } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoPeopleOutline } from "react-icons/io5";

const Card = ({ room }: { room: Room }) => {
  return (
    <div className="bg-white shadow-md rounded-xl transition-all duration-300 hover:shadow-xl overflow-hidden group">
      <div className="h-[260px] w-auto relative overflow-hidden">
        <Image
          src={room.image}
          width={384}
          height={256}
          alt="room image"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-8">
        <h4 className="text-2xl">
          <Link
            href={`/rooms/${room.id}`}
            className="hover:text-gray-800 transition duration-150"
          >
            {room.name}
          </Link>
        </h4>
        <h4 className="text-2xl mb-7">
          <span className="font-semibold text-gray-600">
            {formatCurrency(room.price)}
          </span>
          <span className="text-sm text-gray-400">/Night</span>
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <IoPeopleOutline />
            <span>
              {room.capacity} {room.capacity === 1 ? "person" : "people"}
            </span>
          </div>
          <Link
            href={`/rooms/${room.id}`}
            className="px-6 py-2.5 md:px-10 md:py-3 font-semibold text-white bg-orange-400 rounded-lg hover:bg-orange-500 transition duration-150 "
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
