"use client";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import React, { useState } from "react";
import { useDayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type DateRange } from "react-day-picker";

const kiwiGradient = "linear-gradient(100deg, #fec888 0%, #9ae7b8 100%)";
const retroWaveGradient = "linear-gradient(100deg, #c99bdb 0%, #416eb7 100%)";

const batch1 = [6,7,8,9,10,11,12,13];
const batch2 = [18,19,20,21,22,23,24,25,26];

function isBatch1(date: Date) {
  return date.getMonth() === 6 && batch1.includes(date.getDate());
}
function isBatch2(date: Date) {
  return date.getMonth() === 6 && batch2.includes(date.getDate());
}

function isToday(date: Date) {
  const now = new Date();
  return date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
}

const Calendar: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 6, 6), // July 6, 2025
    to: new Date(2025, 6, 26),  // July 26, 2025
  });
  const [month, setMonth] = useState<Date>(new Date(2025, 6, 1));

  return (
    <div className="relative w-full max-w-md mx-auto mt-24 overflow-hidden">
      <div className="relative z-10">
        {/* Calendar Title */}
        <h2 className="text-h3 text-white mb-4 font-josefin-sans">Calendar</h2>
        {/* Calendar Bubble */}
        <div className="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 mb-6 shadow-xl flex flex-col items-center justify-center p-6">
          {/* Gradient Month Navigation Bar */}
          <div
            className="mx-auto mb-4 rounded-xl px-4 py-2 flex items-center justify-between"
            style={{
              background: retroWaveGradient,
              maxWidth: "320px",
              width: "90%",
            }}
          >
            <button
              className="rounded-full px-2 py-1 text-white font-josefin-sans text-lg hover:bg-[#ffffff33] transition"
              onClick={() => setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
              aria-label="Previous Month"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="font-josefin-sans text-lg text-white px-4 py-1 rounded-xl">
              {month.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button
              className="rounded-full px-2 py-1 text-white font-josefin-sans text-lg hover:bg-[#ffffff33] transition"
              onClick={() => setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
              aria-label="Next Month"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          {/* Calendar Grid (shadcn, with custom weekday color) */}
          <div className="w-full">
            <ShadcnCalendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              month={month}
              onMonthChange={setMonth}
              className="w-full"
              showOutsideDays={true}
              components={{
                MonthCaption: () => <div />, // Remove the default month caption
                Weekday: (props) => {
                  // Use shadcn's default, but color Su red
                  const label = props.children;
                  const isSunday = label === 'Su';
                  return (
                    <th
                      {...props}
                      className={
                        'w-9 text-center font-josefin-sans text-base font-bold ' +
                        (isSunday ? 'text-[#FF5A5A]' : 'text-white/80')
                      }
                    >
                      {label}
                    </th>
                  );
                },
                Day: (props) => {
                  const isBatch = isBatch1(props.day.date) || isBatch2(props.day.date);
                  const isTodayDate = isToday(props.day.date);
                  const date = props.day.date.getDate();
                  
                  // Check if this is part of a consecutive batch
                  const prevDate = new Date(props.day.date);
                  prevDate.setDate(date - 1);
                  const nextDate = new Date(props.day.date);
                  nextDate.setDate(date + 1);
                  
                  const hasPrevBatch = isBatch1(prevDate) || isBatch2(prevDate);
                  const hasNextBatch = isBatch1(nextDate) || isBatch2(nextDate);
                  
                  return (
                    <td
                      {...props}
                      className={`relative w-9 h-9 text-center font-josefin-sans text-base ${
                        isTodayDate ? 'bg-blue-500 rounded-full text-white' : 'text-white'
                      }`}
                    >
                      {isBatch && (
                        <div
                          className="absolute inset-0 border-2"
                          style={{
                            borderImage: `${kiwiGradient} 1`,
                            borderRadius: hasPrevBatch && hasNextBatch ? '0' : 
                                       hasPrevBatch ? '0 50% 50% 0' : 
                                       hasNextBatch ? '50% 0 0 50%' : '50%',
                            left: hasPrevBatch ? '0' : '0.25rem',
                            right: hasNextBatch ? '0' : '0.25rem',
                            top: '0.25rem',
                            bottom: '0.25rem',
                          }}
                        />
                      )}
                      {date}
                    </td>
                  );
                },
              }}
            />
          </div>
        </div>
        {/* Event Descriptions */}
        <div className="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 flex flex-col gap-2 shadow-xl">
          <div className="flex items-center gap-4">
            <span className="font-josefin-sans font-bold text-base" style={{background: kiwiGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>6 - 13 July</span>
            <span className="text-white/80 font-josefin-sans text-base">Open Registration Batch 1</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-josefin-sans font-bold text-base" style={{background: kiwiGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>18 - 26 July</span>
            <span className="text-white/80 font-josefin-sans text-base">Open Registration Batch 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 