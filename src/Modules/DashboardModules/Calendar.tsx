"use client";
import React, { useState } from "react";

const batch1 = [6,7,8,9,10,11,12,13];
const batch2 = [18,19,20,21,22,23,24,25,26];
const months = [
  { name: "July 2025", days: [
    [29, 30, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 1, 2],
  ] },
  { name: "August 2025", days: [
    [27, 28, 29, 30, 31, 1, 2],
    [3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
    [17, 18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29, 30],
    [31, 1, 2, 3, 4, 5, 6],
  ] },
];

const kiwiGradient = "linear-gradient(100deg, #fec888 0%, #9ae7b8 100%)";
const retroWaveGradient = "linear-gradient(100deg, #c99bdb 0%, #416eb7 100%)";

const Calendar: React.FC = () => {
  const [monthIdx, setMonthIdx] = useState(0);

  // Helper to check if a week contains a batch range for pill highlight
  const getRangeType = (week: number[], batch: number[]) => {
    const indices = week.map((d, i) => (batch.includes(d) ? i : -1)).filter(i => i !== -1);
    if (indices.length === 0) return [];
    // Find contiguous ranges
    let ranges = [];
    let start = indices[0];
    for (let i = 1; i < indices.length; i++) {
      if (indices[i] !== indices[i-1] + 1) {
        ranges.push([start, indices[i-1]]);
        start = indices[i];
      }
    }
    ranges.push([start, indices[indices.length-1]]);
    return ranges;
  };

  const { name, days } = months[monthIdx];
  const isJuly = monthIdx === 0;

  return (
    <div className="relative w-full max-w-md mx-auto mt-24 overflow-hidden">
      <div className="relative z-10">
        {/* Calendar Title */}
        <h2 className="text-h3 text-white mb-4 font-josefin-sans">Calendar</h2>
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-4 rounded-xl px-2 py-1" style={{background: retroWaveGradient}}>
          <button
            className="rounded-full px-4 py-1 text-white font-josefin-sans text-lg hover:bg-[#ffffff33] transition"
            onClick={() => setMonthIdx((prev) => (prev === 0 ? 0 : prev - 1))}
            aria-label="Previous Month"
          >
            &lt;
          </button>
          <span className="font-josefin-sans text-lg text-white px-4 py-1 rounded-xl">{name}</span>
          <button
            className="rounded-full px-4 py-1 text-white font-josefin-sans text-lg hover:bg-[#ffffff33] transition"
            onClick={() => setMonthIdx((prev) => (prev === months.length - 1 ? months.length - 1 : prev + 1))}
            aria-label="Next Month"
          >
            &gt;
          </button>
        </div>
        {/* Calendar Grid */}
        <div className="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 mb-6 shadow-xl">
          <div className="grid grid-cols-7 gap-1 text-center text-base font-josefin-sans mb-2">
            {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d, idx) => (
              <div key={d} className={idx === 0 ? "font-bold text-[#FF5A5A]" : "font-bold text-white/80"}>{d}</div>
            ))}
          </div>
          {days.map((week, i) => {
            // Only July has pill highlights
            const batch1Ranges = isJuly ? getRangeType(week, batch1) : [];
            const batch2Ranges = isJuly ? getRangeType(week, batch2) : [];
            return (
              <div className="grid grid-cols-7 gap-1 mb-1 relative" key={i}>
                {/* Render batch1 pill outline */}
                {batch1Ranges.map(([start, end], idx) => (
                  <div
                    key={"b1-"+idx}
                    className="absolute top-0 left-0 h-full w-full pointer-events-none"
                    style={{
                      gridColumnStart: start + 1,
                      gridColumnEnd: end + 2,
                      zIndex: 1,
                    }}
                  >
                    <div className="h-full w-full rounded-full border-2" style={{
                      borderImage: `${kiwiGradient} 1`,
                      borderStyle: 'solid',
                      borderWidth: '2px',
                      background: 'transparent',
                    }}></div>
                  </div>
                ))}
                {/* Render batch2 pill outline */}
                {batch2Ranges.map(([start, end], idx) => (
                  <div
                    key={"b2-"+idx}
                    className="absolute top-0 left-0 h-full w-full pointer-events-none"
                    style={{
                      gridColumnStart: start + 1,
                      gridColumnEnd: end + 2,
                      zIndex: 1,
                    }}
                  >
                    <div className="h-full w-full rounded-full border-2" style={{
                      borderImage: `${kiwiGradient} 1`,
                      borderStyle: 'solid',
                      borderWidth: '2px',
                      background: 'transparent',
                    }}></div>
                  </div>
                ))}
                {week.map((d, j) => {
                  const isCurrentMonth = (monthIdx === 0 && ((i > 0 || d > 7) && (i < 4 || d < 20))) || (monthIdx === 1 && d < 32 && d > 0);
                  const today = new Date();
                  const isToday = isJuly && d === today.getDate() && today.getMonth() === 6 && today.getFullYear() === 2025;
                  // Single day highlight for batch1 or batch2
                  const isBatch1Single = isJuly && batch1.includes(d) && !batch1.includes(week[j-1]) && !batch1.includes(week[j+1]);
                  const isBatch2Single = isJuly && batch2.includes(d) && !batch2.includes(week[j-1]) && !batch2.includes(week[j+1]);
                  return (
                    <div
                      key={j}
                      className={`relative z-10 flex items-center justify-center h-10 w-10 mx-auto font-josefin-sans text-white text-base ${isCurrentMonth ? '' : 'opacity-40'} ${isToday ? 'border-2 border-blue-400 rounded-full' : ''}`}
                    >
                      {/* Single day highlight as circle with gradient border */}
                      {(isBatch1Single || isBatch2Single) && (
                        <span className="absolute inset-0 rounded-full border-2 pointer-events-none" style={{borderImage: `${kiwiGradient} 1`, borderStyle: 'solid', borderWidth: '2px', background: 'transparent'}}></span>
                      )}
                      {d}
                    </div>
                  );
                })}
              </div>
            );
          })}
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