import EditRoom from "@/components/admin/room/EditRoom";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

const EditRoomPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const roomId = (await params).id;
  if (!roomId) return notFound();

  return (
    <div className="max-w-7xl px-4 py-16 mt-10 mx-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <EditRoom roomId={roomId} />
      </Suspense>
    </div>
  );
};

export default EditRoomPage;
