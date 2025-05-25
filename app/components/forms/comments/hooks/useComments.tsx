// hooks/useComments.ts
import { useSingleSlotBooking } from "@/store/single_slot_booking_store/hooks/useSingleSlotBooking";
import { useState, useCallback } from "react";

export function useComments() {
  const { setSingleSlotBooking, singleSlotBooking } = useSingleSlotBooking();
  const [value, setValue] = useState<string | undefined>(
    singleSlotBooking.form4.value
  );

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      setSingleSlotBooking({
        ...singleSlotBooking,
        form4: {
          ...singleSlotBooking.form4,
          value: newValue,
        },
      });
    },
    [setSingleSlotBooking, singleSlotBooking]
  );

  return {
    value,
    setValue,
    handleChange,
  };
}
