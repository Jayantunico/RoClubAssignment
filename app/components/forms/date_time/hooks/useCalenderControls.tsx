"use client";
import { useSingleSlotBooking } from "@/store/single_slot_booking_store/hooks/useSingleSlotBooking";
import { useEffect, useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

function istToUtc(istDate: string) {
  // Create a copy of the original date
  const date = new Date(istDate);

  // Get current timezone offset in minutes (IST is -330 minutes from UTC)
  const istOffset = 330; // 5 hours 30 minutes in minutes

  // Get the current time in UTC milliseconds
  const utcTime = date.getTime() - istOffset * 60 * 1000;

  return new Date(utcTime);
}

export const useCalendarControls = () => {
  const { setSingleSlotBooking, singleSlotBooking } = useSingleSlotBooking();

  useEffect(() => {
    setSingleSlotBooking(
      (prev) => (prev = { ...prev, form1: { ...prev.form1, date: new Date() } })
    );
  }, []);

  const [date, setDate] = useState<Date | undefined>(new Date());

  const navigate = (unit: "year" | "month", direction: "prev" | "next") => {
    if (!date) return;

    const newDate = new Date(date);
    const amount = direction === "prev" ? -1 : 1;

    if (unit === "year") {
      newDate.setFullYear(newDate.getFullYear() + amount);
    } else {
      newDate.setMonth(newDate.getMonth() + amount);
    }

    setDate(newDate);
    setSingleSlotBooking(
      (prev) =>
        (prev = { ...prev, form1: { date: newDate, time: prev.form1.time } })
    );
  };

  const singleDatehandler: SelectSingleEventHandler = (e) => {
    setDate((prev) => (prev = e));
    setSingleSlotBooking(
      (prev) => (prev = { ...prev, form1: { ...prev.form1, date: e } })
    );
  };

  return {
    date,
    setDate,
    singleDatehandler,
    navigate,
    monthName: date?.toLocaleString("default", { month: "short" }),
    year: date?.getFullYear(),
    handlePreviousYear: () => navigate("year", "prev"),
    handleNextYear: () => navigate("year", "next"),
    handlePreviousMonth: () => navigate("month", "prev"),
    handleNextMonth: () => navigate("month", "next"),
  };
};
