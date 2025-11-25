"use client";
import { updateRoom } from "@/lib/action";
import { type RoomProps } from "@/types/room";
import { Amenities } from "@prisma/client";
import { type PutBlobResult } from "@vercel/blob";
import clsx from "clsx";
import Image from "next/image";
import { useActionState, useRef, useState, useTransition } from "react";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import { BarLoader } from "react-spinners";

const EditForm = ({
  amenities,
  room,
}: {
  amenities: Amenities[];
  room: RoomProps;
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(room.image);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  const handleUploadImage = () => {
    if (!inputFileRef.current?.files) return;

    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.set("file", file);

    startTransition(async () => {
      try {
        const response = await fetch("/api/upload", {
          method: "PUT",
          body: formData,
        });

        const data = await response.json();

        if (response.status !== 200) {
          setMessage(data.message);
        }

        const img = data as PutBlobResult;
        setImage(img.url);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleDeleteImage = (image: string) => {
    startTransition(async () => {
      try {
        await fetch(`/api/upload?imageUrl=${image}`, { method: "DELETE" });
        setImage("");
      } catch (error) {
        console.log(error);
      }
    });
  };

  const [state, formAction, isPending] = useActionState(
    updateRoom.bind(null, image, room.id),
    null
  );

  const checkedAmenities = room.RoomAmenities.map(
    ({ amenitiesId }) => amenitiesId
  );

  return (
    <form action={formAction}>
      <div className="grid md:grid-cols-12 gap-5">
        <div className="col-span-8 bg-white p-4">
          <div className="mb-4">
            <input
              type="text"
              name="name"
              defaultValue={room.name}
              id="name"
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
              placeholder="Room Name"
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">
                {state?.error?.name}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              id="description"
              defaultValue={room.description}
              rows={8}
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
              placeholder="Description"
            ></textarea>
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">
                {state?.error?.description}
              </span>
            </div>
          </div>
          <div className="mb-4 grid md:grid-cols-3">
            {amenities.map((amenity) => (
              <div className="flex items-center mb-4" key={amenity.id}>
                <input
                  type="checkbox"
                  name="amenities"
                  id={amenity.id}
                  defaultValue={amenity.id}
                  defaultChecked={checkedAmenities.includes(amenity.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
                />
                <label
                  htmlFor={amenity.id}
                  className="ms-2 text-sm font-medium text-gray-900 capitalize"
                >
                  {amenity.name}
                </label>
              </div>
            ))}
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">
                {state?.error?.amenities}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-4 bg-white p-4">
          <label
            htmlFor="input-file"
            className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 relative"
          >
            <div className="flex flex-col items-center text-gray-500 pt-5 pb-6 z-10">
              {pending ? <BarLoader /> : null}
              {image ? (
                <button
                  type="button"
                  onClick={() => handleDeleteImage(image)}
                  className="flex items-center justify-center bg-transparent size-6 rounded-sm absolute right-1 top-1 text-white hover:bg-red-400 cursor-pointer"
                >
                  <IoTrashOutline className="size-4 text-transparent hover:text-white" />
                </button>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <IoCloudUploadOutline className="size-8" />
                  <p className="mb-1 font-bold text-sm">Select Image</p>
                  {message ? (
                    <p className="text-xs text-red-500">{message}</p>
                  ) : (
                    <p className="text-xs">
                      SVG, PNG, GIF, or Others (max: 4MB)
                    </p>
                  )}
                </div>
              )}
            </div>
            {!image ? (
              <input
                ref={inputFileRef}
                id="input-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUploadImage}
              />
            ) : (
              <Image
                src={image}
                alt="image"
                width={640}
                height={360}
                className="rounded-md absolute aspect-video object-cover"
              />
            )}
          </label>
          <div className="mb-4">
            <input
              type="text"
              name="capacity"
              id="capacity"
              defaultValue={room.capacity}
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
              placeholder="Capacity..."
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">
                {state?.error?.capacity}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="price"
              id="price"
              defaultValue={room.price}
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
              placeholder="Price..."
            />
            <div aria-live="polite" aria-atomic="true">
              <span className="text-sm text-red-500 mt-2">
                {state?.error?.price}
              </span>
            </div>
          </div>

          {/* general message */}
          {state?.message ? (
            <div className="mb-4 bg-red-200 p-2">
              <span className="text-sm text-gray-700 mt-2">
                {state.message}
              </span>
            </div>
          ) : null}

          <button
            className={clsx(
              "bg-orange-400 text-white w-full hover:bg-orange-500 py-2.5 px-6 md:px-1 text-lg font-semibold cursor-pointer",
              { "opacity-50 cursor-progress animate-pulse": isPending }
            )}
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditForm;
