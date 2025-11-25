import { deleteRoom } from "@/lib/action";
import Link from "next/link";
import { IoPencil, IoTrashOutline } from "react-icons/io5";

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/admin/room/edit/${id}`}
      className="rounded-sm p-1 hover:bg-gray-200"
    >
      <IoPencil className="size-5" />
    </Link>
  );
};

export const DeleteButton = ({
  id,
  imageUrl,
}: {
  id: string;
  imageUrl: string;
}) => {
  const deleteRoomWithId = deleteRoom.bind(null, id, imageUrl);
  return (
    <form action={deleteRoomWithId}>
      <button
        type="submit"
        className="rounded-sm p-1 hover:bg-gray-200 cursor-pointer"
      >
        <IoTrashOutline className="size-5" />
      </button>
    </form>
  );
};
