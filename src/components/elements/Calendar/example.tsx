// Example usage of the Calendar component
"use client";

import React, { useState } from "react";
import Calendar from "./index";

interface DateRange {
  start: Date;
  end: Date;
  label: string;
  available: boolean;
}

const CalendarExample: React.FC = () => {
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

  return (
    <div className="w-full">
      <Calendar
        availableRanges={defaultAvailableRanges}
      />
    </div>
  );
};

export default CalendarExample;
