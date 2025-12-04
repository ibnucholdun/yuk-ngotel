import Newsletter from "@/components/Newsletter";
import RoomDetail from "@/components/RoomDetail";
import SimilarRooms from "@/components/SimilarRooms";
import { Metadata } from "next";

import { getRoomById } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const room = await getRoomById(id);

  return {
    title: room?.name || "Room Detail",
    description: room?.description?.substring(0, 160) || "Room details",
  };
}
const RoomDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const roomId = (await params).id;
  const room = await getRoomById(roomId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HotelRoom",
    name: room?.name,
    description: room?.description,
    image: room?.image,
    numberOfRooms: 1,
    occupancy: {
      "@type": "QuantitativeValue",
      value: room?.capacity,
      unitCode: "C62",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: 30, // Example size, you might want to add this to your DB
      unitCode: "SQM",
    },
    petsAllowed: false,
    priceRange: `IDR ${room?.price}`,
  };

  return (
    <div className="mt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RoomDetail roomId={roomId} />

      <SimilarRooms currentRoomId={roomId} />

      <Newsletter />
    </div>
  );
};

export default RoomDetailPage;
