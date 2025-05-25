import React, { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";

interface CustomTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  type?: "24HR" | "12HR";
  minTime?: string; // New prop for minimum time (format: "HH:MM")
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  value,
  onChange,
  className,
  type = "12HR",
  minTime,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse minTime into hours and minutes
  const [minHours, minMinutes] = minTime
    ? minTime.split(":").map(Number)
    : [0, 0];

  // Sync internal state with the value prop
  useEffect(() => {
    const [hoursPart, minutesPart] = value.split(":");
    const newHours = parseInt(hoursPart || "0", 10);
    const newMinutes = parseInt(minutesPart || "0", 10);

    if (!isNaN(newHours) && !isNaN(newMinutes)) {
      setHours(newHours);
      setMinutes(newMinutes);
      if (type === "12HR") {
        setPeriod(newHours >= 12 ? "PM" : "AM");
      }
    }
  }, [value, type]);

  // Check if a time option is disabled based on minTime
  const isTimeDisabled = (checkHours: number, checkMinutes: number) => {
    if (!minTime) return false;

    const currentTotal = hours * 60 + minutes;
    const checkTotal = checkHours * 60 + checkMinutes;
    const minTotal = minHours * 60 + minMinutes;

    return checkTotal < minTotal;
  };

  // Convert 24-hour to 12-hour format for display if 12HR
  const displayHours =
    type === "12HR" ? (hours % 12 === 0 ? 12 : hours % 12) : hours;

  // Options for dropdown
  const hourOptions =
    type === "24HR"
      ? Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
      : Array.from({ length: 12 }, (_, i) =>
          (i + 1).toString().padStart(2, "0")
        );

  const minuteOptions = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const periodOptions = ["AM", "PM"] as const;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle time selection and update parent
  const handleTimeChange = (
    newHours: number,
    newMinutes: number,
    newPeriod?: "AM" | "PM"
  ) => {
    let adjustedHours = newHours;
    if (type === "12HR" && newPeriod) {
      adjustedHours =
        newPeriod === "PM" && newHours < 12
          ? newHours + 12
          : newPeriod === "AM" && newHours === 12
          ? 0
          : newHours;
      setPeriod(newPeriod);
    }

    // Apply minimum time constraint
    if (minTime) {
      const newTotal = adjustedHours * 60 + newMinutes;
      const minTotal = minHours * 60 + minMinutes;

      if (newTotal < minTotal) {
        adjustedHours = minHours;
        newMinutes = minMinutes;
        if (type === "12HR") {
          setPeriod(minHours >= 12 ? "PM" : "AM");
        }
      }
    }

    setHours(adjustedHours);
    setMinutes(newMinutes);

    const newValue = `${adjustedHours.toString().padStart(2, "0")}:${newMinutes
      .toString()
      .padStart(2, "0")}`;
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="w-full pl-10 pr-3 py-2 text-bodySmall_Regular text-black border border-light-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-gray">
          <Clock className="h-5 w-5 flex self-center" />
        </span>
        <span>
          {type === "24HR"
            ? `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}`
            : `${displayHours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")} ${period}`}
        </span>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full border border-light-300 rounded-lg bg-white shadow-lg flex time-picker-dropdown top-[calc(100%+8px)]">
          {/* Hours Column */}
          <div className="w-1/3 max-h-[270px] overflow-y-auto">
            {hourOptions.map((hour) => {
              const hourNum = parseInt(hour);
              const displayHour = type === "12HR" ? hourNum : hourNum;
              const isDisabled = isTimeDisabled(
                type === "12HR"
                  ? period === "PM" && displayHour !== 12
                    ? displayHour + 12
                    : period === "AM" && displayHour === 12
                    ? 0
                    : displayHour
                  : displayHour,
                minutes
              );

              return (
                <div
                  key={hour}
                  className={`p-2 text-center cursor-pointer hover:bg-grey-100 time-picker-option ${
                    parseInt(hour) === displayHours
                      ? "bg-blue-100 font-bold text-white"
                      : ""
                  } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => {
                    if (!isDisabled) {
                      const newHour = parseInt(hour);
                      handleTimeChange(
                        newHour,
                        minutes,
                        type === "12HR" ? period : undefined
                      );
                    }
                  }}
                >
                  {hour}
                </div>
              );
            })}
          </div>
          {/* Minutes Column */}
          <div className="w-1/3 max-h-[270px] overflow-y-auto">
            {minuteOptions.map((minute) => {
              const minuteNum = parseInt(minute);
              const isDisabled = isTimeDisabled(hours, minuteNum);

              return (
                <div
                  key={minute}
                  className={`p-2 text-center cursor-pointer hover:bg-grey-100 time-picker-option ${
                    parseInt(minute) === minutes
                      ? "bg-blue-100 font-bold text-white"
                      : ""
                  } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => {
                    if (!isDisabled) {
                      handleTimeChange(
                        type === "12HR" ? hours % 12 || 12 : hours,
                        minuteNum,
                        type === "12HR" ? period : undefined
                      );
                    }
                  }}
                >
                  {minute}
                </div>
              );
            })}
          </div>
          {/* AM/PM Column (only for 12HR) */}
          {type === "12HR" && (
            <div className="w-1/3 max-h-[270px] overflow-y-auto">
              {periodOptions.map((p) => {
                const isDisabled = isTimeDisabled(
                  p === "PM" && displayHours !== 12
                    ? displayHours + 12
                    : p === "AM" && displayHours === 12
                    ? 0
                    : displayHours,
                  minutes
                );

                return (
                  <div
                    key={p}
                    className={`p-2 text-center cursor-pointer hover:bg-grey-100 time-picker-option ${
                      p === period ? "bg-blue-100 font-bold text-white" : ""
                    } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => {
                      if (!isDisabled) {
                        handleTimeChange(displayHours, minutes, p);
                      }
                    }}
                  >
                    {p}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomTimePicker;
