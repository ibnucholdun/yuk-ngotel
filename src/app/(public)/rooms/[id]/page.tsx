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

  return (
    <div className="mt-16">
      <RoomDetail roomId={roomId} />

      <SimilarRooms currentRoomId={roomId} />

      <Newsletter />
    </div>
  );
};

export default RoomDetailPage;
