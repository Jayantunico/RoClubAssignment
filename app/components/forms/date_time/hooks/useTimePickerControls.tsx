import { useSingleSlotBooking } from "@/store/single_slot_booking_store/hooks/useSingleSlotBooking";
import { useState } from "react";

const useTimePickerControls = () => {
  const { setSingleSlotBooking, singleSlotBooking } = useSingleSlotBooking();
  const [time, setTime] = useState({
    from: singleSlotBooking.form1?.time?.from,
    to: singleSlotBooking.form1?.time?.to,
  });
  const [error, setError] = useState("");

  // Convert time string to minutes since midnight for comparison
  const timeToMinutes = (timeStr: string) => {
    const [timePart, period] = timeStr.split(" ");
    const [hours, minutes] = timePart.split(":").map(Number);
    let total = hours * 60 + minutes;
    if (period === "PM" && hours !== 12) total += 12 * 60;
    if (period === "AM" && hours === 12) total -= 12 * 60;
    return total;
  };

  // Helper to adjust time by minutes
  const adjustTime = (timeStr: string, minutesToAdd: number) => {
    const [timePart, period] = timeStr.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    // Convert to 24-hour format for calculation
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    let totalMinutes = hours * 60 + minutes + minutesToAdd;

    // Handle day rollover
    if (totalMinutes < 0) totalMinutes += 24 * 60;
    if (totalMinutes >= 24 * 60) totalMinutes -= 24 * 60;

    // Convert back to 12-hour format
    hours = Math.floor(totalMinutes / 60) % 24;
    minutes = totalMinutes % 60;

    const newPeriod = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    return `${displayHours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${newPeriod}`;
  };

  const handleFromChange = (newFrom: string) => {
    const toMinutes = timeToMinutes(time.to);
    const fromMinutes = timeToMinutes(newFrom);

    if (fromMinutes > toMinutes) {
      setError("End time cannot be before start time");
      // Auto-adjust end time to be 1 hour after new start time
      const newTo = adjustTime(newFrom, 60);
      setTime({ from: newFrom, to: newTo });
      setSingleSlotBooking(
        (prev) =>
          (prev = {
            ...prev,
            form1: { ...prev.form1, time: { from: newFrom, to: newTo } },
          })
      );
    } else {
      setError("");
      setTime((prev) => ({ ...prev, from: newFrom }));
      setSingleSlotBooking(
        (prev) =>
          (prev = {
            ...prev,
            form1: {
              ...prev.form1,
              time: { ...prev.form1.time, from: newFrom },
            },
          })
      );
    }
  };

  const handleToChange = (newTo: string) => {
    const fromMinutes = timeToMinutes(time.from);
    const toMinutes = timeToMinutes(newTo);

    if (toMinutes < fromMinutes) {
      setError("End time cannot be before start time");
      // Auto-adjust start time to be 1 hour before new end time
      const newFrom = adjustTime(newTo, -60);
      setTime({ from: newFrom, to: newTo });
      setSingleSlotBooking(
        (prev) =>
          (prev = {
            ...prev,
            form1: { ...prev.form1, time: { from: newFrom, to: newTo } },
          })
      );
    } else {
      setError("");
      setTime((prev) => ({ ...prev, to: newTo }));
      setSingleSlotBooking(
        (prev) =>
          (prev = {
            ...prev,
            form1: { ...prev.form1, time: { ...prev.form1.time, to: newTo } },
          })
      );
    }
  };

  return {
    time,
    error,
    handleFromChange,
    handleToChange,
  };
};

export default useTimePickerControls;
