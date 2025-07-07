import TimelineCard from "../components/TimelineCard";
import TimelineCardMobile from "../components/TimelineCardMobile";
import Image from "next/image";

const timelineEntries = [
  ["Registration", "Batch 1", "6 - 13 July 2025"],
  ["Registration", "Batch 2", "18 - 26 July 2025"],
  ["Pengumuman", "Kelompok", "00 July 2025"],
  ["Grand", "Opening", "00 July 2025"],
  ["Mentoring", "Week 1", "00 - 00 July 2025"],
  ["Mentoring", "Week 2", "00 - 00 July 2025"],
  ["Mentoring", "Week 3", "00 - 00 July 2025"],
  ["Mentoring", "Week 4", "00 - 00 July 2025"],
  ["Closing", "Ceremony", "00 - 00 July 2025"],
];

function DesktopTimeline() {
  return (
    <div className="relative pt-[5vh] pr-[7vw] max-md:hidden">
      <img src="/TimelineDesktopTree.png" alt="" />

      <div className="absolute top-[9%] left-[9%]">
        <TimelineCard lines={timelineEntries[0]} />
      </div>

      <div className="absolute top-[35%] left-[15%]">
        <TimelineCard lines={timelineEntries[1]} />
      </div>

      <div className="absolute top-[9%] left-[29%]">
        <TimelineCard lines={timelineEntries[2]} />
      </div>

      <div className="absolute top-[37%] left-[36%]">
        <TimelineCard lines={timelineEntries[3]} />
      </div>

      <div className="absolute top-[19%] left-[49.5%]">
        <TimelineCard lines={timelineEntries[4]} />
      </div>

      <div className="absolute top-[43%] left-[55.75%]">
        <TimelineCard lines={timelineEntries[5]} />
      </div>

      <div className="absolute top-[56%] left-[67%]">
        <TimelineCard lines={timelineEntries[6]} />
      </div>

      <div className="absolute top-[36%] left-[76.5%]">
        <TimelineCard lines={timelineEntries[7]} />
      </div>

      <div className="absolute top-[11%] left-[84.25%]">
        <TimelineCard lines={timelineEntries[8]} />
      </div>
    </div>
  );
}

function MobileTimeline() {
  return (
    <div className="relative md:hidden">
      <img src="/TimelineMobileTree.png" alt="" />

      <div className="absolute top-[7.5%] left-[63%]">
        <TimelineCardMobile lines={timelineEntries[0]} />
      </div>

      <div className="absolute top-[14.5%] left-[32%]">
        <TimelineCardMobile lines={timelineEntries[1]} />
      </div>

      <div className="absolute top-[30%] left-[67%]">
        <TimelineCardMobile lines={timelineEntries[2]} />
      </div>

      <div className="absolute top-[38.5%] left-[34%]">
        <TimelineCardMobile lines={timelineEntries[3]} />
      </div>

      <div className="absolute top-[54%] left-[60%]">
        <TimelineCardMobile lines={timelineEntries[4]} />
      </div>

      <div className="absolute top-[60.75%] left-[33%]">
        <TimelineCardMobile lines={timelineEntries[5]} />
      </div>

      <div className="absolute top-[74.5%] left-[21.5%]">
        <TimelineCardMobile lines={timelineEntries[6]} />
      </div>

      <div className="absolute top-[84%] left-[46.5%]">
        <TimelineCardMobile lines={timelineEntries[7]} />
      </div>

      <div className="absolute top-[92.75%] left-[50%]">
        <TimelineCardMobile lines={timelineEntries[8]} />
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <div className="relative">
      <h1 className="text-h2 md:text-h1 z-10 font-josefin-sans text-center">
        Timeline
      </h1>
      <DesktopTimeline />
      <MobileTimeline />

      <div className="absolute top-0 -translate-y-[60%] animate-star-float translate-x-[80px] right-0 aspect-[382/262] w-[382px] max-md:w-[300px] max-sm:w-[250px] max-xs:w-[200px]">
        <Image src="/saturn.svg" alt="bg" fill className="object-contain" />
      </div>
    </div>
  );
}
