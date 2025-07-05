import Image from "next/image";
import TimelineCard from "../components/TimelineCard";

const timelineEntries = [
  [
    "Registration",
    "Batch 1",
    "6 - 13 July 2025"
  ],
  [
    "Registration",
    "Batch 2",
    "18 - 26 July 2025"
  ],
  [
    "Pengumuman",
    "Kelompok",
    "00 July 2025"
  ],
  [
    "Grand",
    "Opening",
    "00 July 2025"
  ],
  [
    "Mentoring",
    "Week 1",
    "00 - 00 July 2025"
  ],
  [
    "Mentoring",
    "Week 2",
    "00 - 00 July 2025"
  ],
  [
    "Mentoring",
    "Week 3",
    "00 - 00 July 2025"
  ],
  [
    "Mentoring",
    "Week 4",
    "00 - 00 July 2025"
  ],
  [
    "Closing",
    "Ceremony",
    "00 - 00 July 2025"
  ],
]


function DesktopTimeline() {
  return (
    <div className="relative border pt-[5vh] pr-[7vw]">
      <img src="/TimelineDesktopTree.png" alt=""/>
      <div className="absolute top-[9%] left-[9%]">
        <TimelineCard lines={timelineEntries[0]}/>
      </div>

      <div className="absolute top-[35%] left-[15%]">
        <TimelineCard lines={timelineEntries[1]}/>
      </div>

      <div className="absolute top-[9%] left-[29%]">
        <TimelineCard lines={timelineEntries[2]}/>
      </div>

      <div className="absolute top-[37%] left-[36%]">
        <TimelineCard lines={timelineEntries[3]}/>
      </div>

      <div className="absolute top-[19%] left-[49.5%]">
        <TimelineCard lines={timelineEntries[4]}/>
      </div>

      <div className="absolute top-[43%] left-[55.75%]">
        <TimelineCard lines={timelineEntries[5]}/>
      </div>

      <div className="absolute top-[56%] left-[67%]">
        <TimelineCard lines={timelineEntries[6]}/>
      </div>

      <div className="absolute top-[36%] left-[76.5%]">
        <TimelineCard lines={timelineEntries[7]}/>
      </div>

      <div className="absolute top-[11%] left-[84.25%]">
        <TimelineCard lines={timelineEntries[7]}/>
      </div>
    </div>
  )
}


function MobileTimeline() {
  return (
    <div>
      mobile timeline
    </div>
  )
}


export default function Timeline() {
  return (
    <div>
      <DesktopTimeline/>
    </div>
  )
}
