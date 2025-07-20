"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateRange {
  start: Date;
  end: Date;
  label: string;
  available: boolean;
}

interface CalendarProps {
  availableRanges?: DateRange[];
  onRangeSelect?: (range: DateRange | null) => void;
  selectedRange?: DateRange | null;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  availableRanges = [],
  onRangeSelect,
  selectedRange,
  className,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Hard-coded available ranges as example
  const defaultAvailableRanges: DateRange[] = [
    {
      start: new Date(2025, 6, 6), // July 5, 2025
      end: new Date(2025, 6, 13), // July 8, 2025
      label: "Summer Workshop",
      available: true,
    },
    {
      start: new Date(2025, 6, 18), // July 5, 2025
      end: new Date(2025, 6, 26), // July 8, 2025
      label: "Summer Workshop",
      available: true,
    },
  ];

  const ranges =
    availableRanges.length > 0 ? availableRanges : defaultAvailableRanges;

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Calendar calculations
  const monthData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return {
      year,
      month,
      firstDayOfMonth,
      lastDayOfMonth,
      days,
    };
  }, [currentDate]);

  // Check if a date is within any available range
  const getDateStatus = (date: Date) => {
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    for (const range of ranges) {
      const rangeStart = new Date(
        range.start.getFullYear(),
        range.start.getMonth(),
        range.start.getDate()
      );
      const rangeEnd = new Date(
        range.end.getFullYear(),
        range.end.getMonth(),
        range.end.getDate()
      );

      if (dateOnly >= rangeStart && dateOnly <= rangeEnd) {
        return {
          inRange: true,
          range,
          isStart: dateOnly.getTime() === rangeStart.getTime(),
          isEnd: dateOnly.getTime() === rangeEnd.getTime(),
        };
      }
    }

    return { inRange: false, range: null, isStart: false, isEnd: false };
  };

  // Check if a date is selected
  const isSelected = (date: Date) => {
    if (!selectedRange) return false;
    const dateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const selectedStart = new Date(
      selectedRange.start.getFullYear(),
      selectedRange.start.getMonth(),
      selectedRange.start.getDate()
    );
    const selectedEnd = new Date(
      selectedRange.end.getFullYear(),
      selectedRange.end.getMonth(),
      selectedRange.end.getDate()
    );

    return dateOnly >= selectedStart && dateOnly <= selectedEnd;
  };

  // Handle date click
  const handleDateClick = (date: Date) => {
    const status = getDateStatus(date);
    if (status.inRange && status.range?.available) {
      onRangeSelect?.(status.range);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="w-full flex flex-col gap-2">
      <div
        className={cn(
          "w-full max-w-md mx-auto glass rounded-xl border border-[#ffffff59] shadow-lg p-6",
          className
        )}
      >
        {/* Header */}
        <div
          className="border border-[#ffffff59] glass rounded-xl w-full cursor-default font-semibold text-base font-josefin-sans py-2 px-2 flex justify-between"
          style={{
            background:
              "linear-gradient(100deg, rgba(201, 155, 219, 0.50) 0%, rgba(65, 110, 183, 0.50) 100%)",
          }}
        >
          <button className="cursor-pointer" onClick={goToPreviousMonth}>
            <ChevronLeft />
          </button>
          {monthNames[monthData.month]} {monthData.year}
          <button className="cursor-pointer" onClick={goToNextMonth}>
            <ChevronRight />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center font-josefin-sans font-bold text-base text-white py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-y-2">
          {monthData.days.map((date, index) => {
            const isCurrentMonth = date.getMonth() === monthData.month;
            const status = getDateStatus(date);
            const selected = isSelected(date);
            const isToday = new Date().toDateString() === date.toDateString();

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={!status.inRange || !status.range?.available}
                className={cn(
                  "relative text-center h-8 w-full font-josefin-sans font-bold text-base transition-all duration-200",
                  {
                    // Current month styling
                    "text-white": isCurrentMonth,
                    "text-neutral-500": !isCurrentMonth,

                    // Today styling
                    "after:content-[''] after:absolute after:w-full after:h-full after:rounded-full after:top-0 after:left-0 after:border-2 after:border-instrasigent-sea-500":
                      isToday && !selected,

                    // Selected range styling - connected without rounded corners
                    " text-white": selected,

                    // Only round the start and end dates of each range
                    "rounded-l-full border-l-2 border-y-2 border-[#FEC888]":
                      status.isStart && status.inRange,
                    "rounded-r-full border-r-2 border-y-2 border-[#FEC888]":
                      status.isEnd && status.inRange,
                    "border-y-2 border-[#FEC888]":
                      !status.isStart && status.inRange && !status.isEnd, // Single day range

                    // Disabled styling
                    "": !status.inRange || !status.range?.available,
                    "cursor-pointer": status.inRange && status.range?.available,
                  }
                )}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Schedule */}
      <div className="w-full font-josefin-sans text-body-mobile lg:text-body max-w-md mx-auto flex flex-col gap-2 glass rounded-xl border border-[#ffffff59] shadow-lg p-6">
        {ranges.map((range, index) => (
          <div key={index} className="flex justify-between">
            <p className="text-transparent bg-clip-text bg-gradient-kiwi">
              {range.start.getDate()} - {range.end.getDate()}{" "}
              {monthNames[range.start.getMonth()]}
            </p>
            <p>{range.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
