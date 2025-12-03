import Newsletter from "@/components/Newsletter";
import RoomDetail from "@/components/RoomDetail";
import SimilarRooms from "@/components/SimilarRooms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Room Detail",
  description: "Room Detail",
};
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
