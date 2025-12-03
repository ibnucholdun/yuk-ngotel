"use client";

import { createReservation } from "@/lib/action";
import { DisabledDateProps, RoomDetailProps } from "@/types/room";
import clsx from "clsx";
import { addDays } from "date-fns";
import Link from "next/link";
import { useActionState, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservationForm = ({
  room,
  disabledDate,
  userPhone,
}: {
  room: RoomDetailProps;
  disabledDate: DisabledDateProps[];
  userPhone?: string | null;
}) => {
  const getFirstAvailableDate = (disabledDates: DisabledDateProps[]) => {
    let currentDate = new Date();
    // Normalize to start of day
    currentDate.setHours(0, 0, 0, 0);

    // Sort disabled dates by start date
    const sortedDisabledDates = [...disabledDates].sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    for (const range of sortedDisabledDates) {
      const start = new Date(range.startDate);
      const end = new Date(range.endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      // If current date is within a disabled range, move to the day after the end date
      if (currentDate >= start && currentDate <= end) {
        currentDate = addDays(end, 1);
      }
    }
    return currentDate;
  };

  const StartDate = getFirstAvailableDate(disabledDate);
  const EndDate = addDays(StartDate, 1);

  const [startDate, setStartDate] = useState(StartDate);
  const [endDate, setEndDate] = useState(EndDate);

  const handleDateChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [state, formAction, isPending] = useActionState(
    createReservation.bind(null, room.id, room.price, startDate, endDate),
    null
  );

  const excludeDates = disabledDate.map((item) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    startDate.setHours(0, 0, 0, 0);

    return {
      start: startDate,
      end: endDate,
    };
  });

  return (
    <div className="">
      <form action={formAction}>
        <div className="mb-4">
          <label
            htmlFor=""
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Arrival -Departure
          </label>

          <DatePicker
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            excludeDateIntervals={excludeDates}
            onChange={handleDateChange}
            selectsRange={true}
            dateFormat={"dd-MM-yyyy"}
            wrapperClassName="w-full"
            className="py-2 px-4 rounded-md border border-gray-300 w-full"
          />
          <div className="" aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">{state?.messageDate}</p>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="guests"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Guests
          </label>
          <input
            type="number"
            name="guests"
            id="guests"
            min={1}
            max={room.capacity}
            defaultValue={1}
            className="py-2 px-4 rounded-md border border-gray-300 w-full"
            placeholder="Number of guests..."
          />
          <div className="" aria-live="polite" aria-atomic="true">
            <p className="text-sm text-red-500 mt-2">{state?.error?.guests}</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending || !userPhone}
          className={clsx(
            "px-10 py-3 text-center font-semibold text-white w-full bg-orange-400 rounded-sm cursor-pointer hover:bg-orange-500",
            {
              "opacity-50 cursor-progress animate-pulse": isPending,
              "opacity-50 cursor-not-allowed": !userPhone,
            }
          )}
        >
          {isPending ? "Loading..." : "Reserve Now"}
        </button>
        {!userPhone && (
          <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
            Please fill in your phone number in{" "}
            <Link
              href="/my-dashboard/profile"
              className="font-bold underline hover:text-red-800"
            >
              Profile
            </Link>{" "}
            to proceed with reservation.
          </div>
        )}
      </form>
    </div>
  );
};

export default ReservationForm;
