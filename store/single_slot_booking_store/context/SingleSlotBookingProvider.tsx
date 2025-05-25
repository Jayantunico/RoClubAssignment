"use client";
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { SingleSlotBookingData } from "../modal/SingleSlotBookingData";

type SingleSlotBookingProviderType = {
  singleSlotBooking: SingleSlotBookingData;
  setSingleSlotBooking: Dispatch<SetStateAction<SingleSlotBookingData>>;
};

export const SingleSlotBookingContext = createContext<
  SingleSlotBookingProviderType | undefined
>(undefined);

interface SingleSlotBookingProviderProps {
  children: ReactNode;
}

export function SingleSlotBookingProvider({
  children,
}: SingleSlotBookingProviderProps) {
  const [singleSlotBooking, setSingleSlotBooking] =
    useState<SingleSlotBookingData>({
      form1: {
        date: new Date("2025"),
        time: { from: "09:00 AM", to: "10:00 AM" },
      },
      form2: { value: undefined },
      form3: { value: [] },
      form4: { value: "" },
    });

  return (
    <SingleSlotBookingContext.Provider
      value={{ singleSlotBooking, setSingleSlotBooking }}
    >
      {children}
    </SingleSlotBookingContext.Provider>
  );
}
