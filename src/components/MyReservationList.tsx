import Image from "next/image";
import { getReservationByUserId } from "@/lib/data";
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import Link from "next/link";

const MyReservationList = async () => {
  const reservation = await getReservationByUserId();
  if (!reservation) return notFound();

  return (
    <div className="">
      {reservation.map((reservation) => (
        <div
          className="bg-white shadow pb-4 mb-4 md:pb-0 relative"
          key={reservation.id}
        >
          <div className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded-t-sm ">
            <h1 className="text-sm font-medium text-gray-900 truncate">
              Reservation ID: #{reservation.id}
            </h1>
            <div className="flex gap-1 px-3 py-2 text-sm font-normal">
              <span>Status:</span>
              <span className="font-bold uppercase">
                {reservation.payments?.status}
              </span>
            </div>
          </div>
          <div className="flex flex-col mb-4 items-start bg-white rounded-sm md:flex-row md:w-full">
            <Image
              src={reservation.Room.image}
              width={500}
              height={300}
              className="object-cover w-full rounded-t-sm h-60 md:h-auto md:w-1/3 md:rounded-none md:rounded-s-sm "
              alt="image room"
            />
            <div className="flex items-center gap-1 mb-3 px-2 font-normal text-gray-700 w-full">
              <div className="w-full">
                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                  <span>Price</span>
                  <span>{formatCurrency(reservation.Room.price)}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                  <span>Arrival</span>
                  <span>{formatDate(reservation.startDate.toISOString())}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                  <span>Departure</span>
                  <span>{formatDate(reservation.endDate.toISOString())}</span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                  <span>Duration</span>
                  <span>
                    {differenceInCalendarDays(
                      reservation.endDate,
                      reservation.startDate
                    )}
                    <span className="ml-1"> Night</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-gray-900 truncate">
                  <span>Sub Total</span>
                  <span>
                    {reservation.payments &&
                      formatCurrency(reservation.payments.amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end absolute inset-4">
            {reservation.payments?.status === "unpaid" ? (
              <Link
                href={`/checkout/${reservation.id}`}
                className="px-6 py-1 bg-orange-400 text-white rounded-md hover:bg-orange-500"
              >
                Pay Now
              </Link>
            ) : (
              <Link
                href={`/my-reservation/${reservation.id}`}
                className="px-6 py-1 bg-orange-400 text-white rounded-md hover:bg-orange-500"
              >
                Viiew Detail
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyReservationList;
