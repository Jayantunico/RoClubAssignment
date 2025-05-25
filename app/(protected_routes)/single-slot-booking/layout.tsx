import { SingleSlotBookingProvider } from "@/store/single_slot_booking_store/context/SingleSlotBookingProvider";
import React, { FC } from "react";

const SingleSlotBooking: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SingleSlotBookingProvider>{children}</SingleSlotBookingProvider>;
};

export default SingleSlotBooking;
