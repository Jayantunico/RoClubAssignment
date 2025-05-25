import React from "react";
import CustomCalender from "./CustomCalender";
import CustomTimePicker from "./CustomTimePicker";

const DateTime = () => {
  return (
    <div className="w-full">
      <CustomCalender />
      <CustomTimePicker />
    </div>
  );
};

export default DateTime;
