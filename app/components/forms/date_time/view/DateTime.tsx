import React from "react";
import CustomTimePicker from "./CustomTimePicker";
import CustomCalender from "./CustomCalender";

const DateTime = () => {
  return (
    <div className="w-full">
      <CustomCalender />
      <CustomTimePicker />
    </div>
  );
};

export default DateTime;
