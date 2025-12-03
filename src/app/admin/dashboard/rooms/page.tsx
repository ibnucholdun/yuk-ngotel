import RoomTable from "@/components/admin/room/RoomTable";
import TableRoomAdminSkeleton from "@/components/skeletons/TableRoomAdminSkeleton";
import Link from "next/link";
import { Suspense } from "react";

const RoomPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const page = Number((await searchParams).page) || 1;
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-800">Room List</h1>
        <Link
          href="/admin/dashboard/rooms/create"
          className="bg-orange-400 px-6 py-2.5 hover:bg-orange-500 text-white font-bold"
        >
          Create New
        </Link>
      </div>
      <Suspense fallback={<TableRoomAdminSkeleton />}>
        <RoomTable page={page} />
      </Suspense>
    </div>
  );
};

export default RoomPage;
