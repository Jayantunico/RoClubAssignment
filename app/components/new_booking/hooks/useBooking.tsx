"use client";
import { useState } from "react";
import { bookingOptions } from "../modal/BookingOption";
import { useRouter } from "next/navigation";

export const useBooking = () => {
  const [selectedValue, setSelectedValue] = useState(bookingOptions[0].route);
  const router = useRouter();

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
  };

  const onNextClick = () => {
    router.push(selectedValue);
  };

  return {
    selectedValue,
    bookingOptions,
    handleValueChange,
    onNextClick,
  };
};
