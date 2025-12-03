import EditRoom from "@/components/admin/room/EditRoom";
import { notFound } from "next/navigation";
import React from "react";

const EditRoomPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const roomId = (await params).id;
  if (!roomId) return notFound();

  return (
    <div className="max-w-7xl mx-auto">
      <EditRoom roomId={roomId} />
    </div>
  );
};

export default EditRoomPage;
