import Pagination from "@/components/Pagination";
import { getReservations } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import Image from "next/image";

const ReservationList = async ({ page = 1 }: { page?: number }) => {
  const limit = 10;
  const { reservations, total } = await getReservations({ page, limit });
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-white p-4 mt-5 shadow-sm">
      <table className="w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 w-32 text-sm font-bold text-gray-700 uppercase text-left">
              Image
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
              Name
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
              Arrival
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
              Departure
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
              Room Name
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
              Price
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text-left">
              Created At
            </th>
            <th className="px-6 py-3 text-sm font-bold text-gray-700 uppercase text">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reservations.map((reservation) => (
            <tr className="hover:bg-gray-100" key={reservation.id}>
              <td className="px-6 py-4">
                <div className="h-20 w-32 relative">
                  <Image
                    src={reservation.Room.image}
                    fill
                    sizes="20vw"
                    alt="reservation image"
                    className="object-cover"
                  />
                </div>
              </td>
              <td className="px-6 py-4">{reservation.User.name}</td>
              <td className="px-6 py-4">
                {formatDate(reservation.startDate.toISOString())}
              </td>
              <td className="px-6 py-4">
                {formatDate(reservation.endDate.toISOString())}
              </td>
              <td className="px-6 py-4">{reservation.Room.name}</td>
              <td className="px-6 py-4">{formatCurrency(reservation.price)}</td>
              <td className="px-6 py-4">
                {formatDate(reservation.createdAt.toString())}
              </td>
              <td className="px-6 py-4 text-center">
                <span className="capitalize">
                  {reservation.payments?.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default ReservationList;
