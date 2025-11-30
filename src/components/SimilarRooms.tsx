import { getSimilarRooms } from "@/lib/data";
import Card from "./Card";

const SimilarRooms = async ({ currentRoomId }: { currentRoomId: string }) => {
  const similarRooms = await getSimilarRooms(currentRoomId);

  if (!similarRooms || similarRooms.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Similar Rooms
          </h2>
          <p className="text-gray-600">
            You might also be interested in these rooms.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {similarRooms.map((room) => (
            <Card room={room} key={room.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarRooms;
