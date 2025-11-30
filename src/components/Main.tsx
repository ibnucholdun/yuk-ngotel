import { getRooms } from "@/lib/data";
import Card from "./Card";
import { notFound } from "next/navigation";
import Pagination from "./Pagination";

const Main = async ({ limit, page = 1 }: { limit?: number; page?: number }) => {
  const { rooms, total } = await getRooms({ limit, page });

  if (!rooms) return notFound();

  const totalPages = limit ? Math.ceil(total / limit) : 1;

  return (
    <div className="max-w-7xl py-6 pb-20 px-4 mx-auto">
      <div className="grid gap-7 md:grid-cols-3">
        {rooms.map((room) => (
          <Card room={room} key={room.id} />
        ))}
      </div>
      {limit && totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default Main;
