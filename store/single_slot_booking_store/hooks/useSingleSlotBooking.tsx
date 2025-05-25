"use client";
import { useContext } from "react";
import { SingleSlotBookingContext } from "../context/SingleSlotBookingProvider";

export function useSingleSlotBooking() {
  const context = useContext(SingleSlotBookingContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
