import { getReservationByUserId } from "@/lib/data";
import { Metadata } from "next";
import { auth } from "./../../../auth";
import { FaCalendarCheck, FaMoneyBillWave, FaClock } from "react-icons/fa";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard Overview",
  description: "User Dashboard Overview",
};

const DashboardOverviewPage = async () => {
  const session = await auth();
  const reservations = await getReservationByUserId();

  if (!session || !session.user) return null;

  const totalReservations = reservations?.length || 0;
  const activeReservations =
    reservations?.filter(
      (r) =>
        new Date(r.endDate) >= new Date() && r.payments?.status !== "failure"
    ).length || 0;
  const totalSpent =
    reservations?.reduce((acc, curr) => {
      if (curr.payments?.status?.toLowerCase() === "paid") {
        return acc + (curr.payments.amount || 0);
      }
      return acc;
    }, 0) || 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session.user.name}!
        </h1>
        <p className="text-gray-600">
          Here is what is happening with your account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
            <FaCalendarCheck className="text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Reservations</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {totalReservations}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-green-50 text-green-600 rounded-full">
            <FaClock className="text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Active Stays</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {activeReservations}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-orange-50 text-orange-600 rounded-full">
            <FaMoneyBillWave className="text-xl" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Spent</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalSpent)}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Recent Activity
        </h3>
        {reservations && reservations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="border-b border-gray-100 text-xs uppercase text-gray-500 bg-gray-50">
                <tr>
                  <th className="px-4 py-3">Room</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reservations.slice(0, 5).map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {res.Room.name}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(res.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${
                          res.payments?.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : res.payments?.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : res.payments?.status === "failure"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {res.payments?.status || "Unknown"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {res.payments?.amount
                        ? formatCurrency(res.payments.amount)
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No recent activity found.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardOverviewPage;
