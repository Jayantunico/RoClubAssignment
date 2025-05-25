"use client";
import { useSingleSlotBooking } from "@/store/single_slot_booking_store/hooks/useSingleSlotBooking";
import { useState } from "react";

export const useCalendarControls = () => {
  const { setSingleSlotBooking, singleSlotBooking } = useSingleSlotBooking();
  const [date, setDate] = useState<Date | undefined>(
    singleSlotBooking?.form1?.date
  );

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
      (prev) => (prev = { ...prev, form1: { ...prev.form1, date: newDate } })
    );
  };

  return {
    date,
    setDate,
    navigate,
    monthName: date?.toLocaleString("default", { month: "short" }),
    year: date?.getFullYear(),
    handlePreviousYear: () => navigate("year", "prev"),
    handleNextYear: () => navigate("year", "next"),
    handlePreviousMonth: () => navigate("month", "prev"),
    handleNextMonth: () => navigate("month", "next"),
  };
};
