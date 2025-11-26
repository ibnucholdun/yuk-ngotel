import RoomDetail from "@/components/RoomDetail";
import { Metadata } from "next";
import React, { Suspense } from "react";

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
      <Suspense fallback={<div>Loading...</div>}>
        <RoomDetail roomId={roomId} />
      </Suspense>
    </div>
  );
};

export default RoomDetailPage;
