"use client";

import React from "react";
import Calendar from "@/components/elements/Calendar";
import type { DateRange } from "@/components/elements/Calendar";

const SectionCalendar: React.FC = () => {
  const defaultAvailableRanges: DateRange[] = [
    {
      start: new Date(2025, 6, 19),
      end: new Date(2025, 6, 19),
      label: "Website Release",
      available: true,
    },
    {
      start: new Date(2025, 6, 23),
      end: new Date(2025, 6, 31),
      label: "Open Registration",
      available: true,
    },
    {
      start: new Date(2025, 6, 31),
      end: new Date(2025, 6, 31),
      label: "Pengumuman Kelompok",
      available: true,
    },
    {
      start: new Date(2025, 7, 1),
      end: new Date(2025, 7, 1),
      label: "Grand Opening",
      available: true,
    },
    {
      start: new Date(2025, 7, 4),
      end: new Date(2025, 7, 9),
      label: "Mentoring Week 0",
      available: true,
    },
    {
      start: new Date(2025, 7, 10),
      end: new Date(2025, 7, 17),
      label: "Mentoring Week 1",
      available: true,
    },
    {
      start: new Date(2025, 7, 18),
      end: new Date(2025, 7, 24),
      label: "Mentoring Week 2",
      available: true,
    },
    {
      start: new Date(2025, 7, 25),
      end: new Date(2025, 7, 31),
      label: "Mentoring Week 3",
      available: true,
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2 md:gap-3 lg:gap-4">
      <h4 className="font-josefin-sans text-h4 max-lg:text-h4-mobile">
        Calendar
      </h4>
      <Calendar availableRanges={defaultAvailableRanges} />
    </div>
  );
};

export default SectionCalendar;
