import React from "react";
import TimePicker from "@/components/ui/TimePicker";
import useTimePickerControls from "../hooks/useTimePickerControls";

const ClubTimePicker = () => {
  const { time, error, handleFromChange, handleToChange } =
    useTimePickerControls();

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex w-full gap-3 px-4">
        <div className="flex-1">
          <p className="text-sm">From</p>
          <TimePicker
            onChange={handleFromChange}
            value={time.from}
            type="12HR"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm">To</p>
          <TimePicker onChange={handleToChange} value={time.to} type="12HR" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm px-4">{error}</p>}
    </div>
  );
};

export default ClubTimePicker;
