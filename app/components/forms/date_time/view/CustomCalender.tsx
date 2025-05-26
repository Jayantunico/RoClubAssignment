import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useCalendarControls } from "../hooks/useCalenderControls";

const CustomCalender = () => {
  const {
    date,
    setDate,
    monthName,
    year,
    handlePreviousYear,
    handleNextYear,
    handlePreviousMonth,
    handleNextMonth,
    singleDatehandler,
  } = useCalendarControls();

  return (
    <div className="w-full flex-col items-center justify-center">
      <CalendarHeader
        monthName={monthName}
        year={year}
        onPreviousYear={handlePreviousYear}
        onNextYear={handleNextYear}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />

      <DayPicker
        mode="single"
        selected={date}
        onSelect={singleDatehandler}
        month={date}
        onMonthChange={setDate}
        showOutsideDays
        fixedWeeks
        className="border rounded-md p-2"
        styles={{
          caption: { display: "none" },
          head_cell: {
            fontWeight: "bold",
            fontSize: "0.875rem",
          },
          cell: { fontSize: "0.875rem" },
          day: { margin: "0.15rem" },
        }}
        modifiersStyles={{
          outside: { opacity: 0.5 },
          selected: {
            backgroundColor: "#3b82f6",
            color: "white",
          },
        }}
      />
    </div>
  );
};

const CalendarHeader = ({
  monthName,
  year,
  onPreviousYear,
  onNextYear,
  onPreviousMonth,
  onNextMonth,
}: {
  monthName?: string;
  year?: number;
  onPreviousYear: () => void;
  onNextYear: () => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}) => (
  <div className="flex items-center justify-between mb-2 px-2">
    <div className="flex items-center gap-1">
      <button
        onClick={onPreviousYear}
        className="p-1 rounded hover:bg-gray-100"
        aria-label="Previous year"
      >
        <ChevronsLeft className="h-4 w-4" />
      </button>
      <button
        onClick={onPreviousMonth}
        className="p-1 rounded hover:bg-gray-100"
        aria-label="Previous month"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    </div>

    <span className="font-medium">
      {monthName} {year}
    </span>

    <div className="flex items-center gap-1">
      <button
        onClick={onNextMonth}
        className="p-1 rounded hover:bg-gray-100"
        aria-label="Next month"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      <button
        onClick={onNextYear}
        className="p-1 rounded hover:bg-gray-100"
        aria-label="Next year"
      >
        <ChevronsRight className="h-4 w-4" />
      </button>
    </div>
  </div>
);

export default CustomCalender;
