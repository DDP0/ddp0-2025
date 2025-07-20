"use client";

import React, {
  type ComponentPropsWithoutRef,
  useEffect,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export interface CountdownProps {
  date: string;
  type: "Days" | "Hours" | "Minutes" | "Seconds";
  classNameType?: string;
  classNameBlock?: string;
  isHollow?: boolean;
}

const BlockTime: React.FC<ComponentPropsWithoutRef<"div"> & CountdownProps> = ({
  date,
  type,
  classNameType,
  classNameBlock,
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className={cn(
          "inline-block font-josefin-sans font-normal text-white text-xs md:text-base opacity-90",
          classNameType
        )}
      >
        {type}
      </span>

      <div
        className={cn(
          "relative flex items-center justify-center",
          "w-[64px] h-[64px] md:w-[82px] md:h-[82px]",
          "bg-white/5",
          "backdrop-blur-md",
          "border border-white/20",
          "shadow-lg",
          "rounded-xl",
          classNameBlock
        )}
        style={{
          WebkitBackdropFilter: "blur(12px)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(255,255,255,0.25), rgba(255,255,255,0))",
          }}
        />

        <span
          className={cn(
            "relative z-10 font-josefin-sans font-semibold text-2xl md:text-h3 text-white",
            classNameType
          )}
        >
          {date}
        </span>
      </div>
    </div>
  );
};

const DotTime = () => {
  return (
    <div className="flex flex-col gap-3 pt-4 md:pt-7">
      <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-gradient-to-r flex items-center justify-center">
        <div className="w-[3px] h-[3px] md:w-[6px] md:h-[6px] rounded-full bg-white"></div>
      </div>

      <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-gradient-to-r flex items-center justify-center">
        <div className="w-[3px] h-[3px] md:w-[6px] md:h-[6px] rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export const Countdown = ({
  targetDate,
  displayDate = false,
  classNameType,
  classNameBlock,
  onComplete,
}: {
  targetDate: Date;
  displayDate?: boolean;
  classNameType?: string;
  classNameBlock?: string;
  onComplete?: () => void;
}) => {
  const defaultRemainingTime = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const deadlineDate = targetDate.getTime();
      const now = new Date().getTime();
      const distance = deadlineDate - now;

      const days = Math.floor(distance / (24 * 60 * 60 * 1000));
      const hours = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
      const seconds = Math.floor((distance % (60 * 1000)) / 1000);

      if (distance < 0) {
        setRemainingTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        if (onComplete) {
          onComplete();
        }
      } else {
        setRemainingTime({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, displayDate, onComplete]);

  useEffect(() => {
    const date = targetDate.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const time = targetDate
      .toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      })
      .replace(".", ":");

    setDateTime({
      date,
      time,
    });
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-1 md:gap-4">
        <BlockTime
          classNameBlock={classNameBlock}
          classNameType={classNameType}
          type={remainingTime.days != 0 ? "Days" : "Hours"}
          date={
            remainingTime.days != 0
              ? remainingTime.days.toString().padStart(2, "0")
              : remainingTime.hours.toString().padStart(2, "0")
          }
        />
        <DotTime />
        <BlockTime
          classNameBlock={classNameBlock}
          classNameType={classNameType}
          type={remainingTime.days != 0 ? "Hours" : "Minutes"}
          date={
            remainingTime.days != 0
              ? remainingTime.hours.toString().padStart(2, "0")
              : remainingTime.minutes.toString().padStart(2, "0")
          }
        />
        <DotTime />
        <BlockTime
          classNameBlock={classNameBlock}
          classNameType={classNameType}
          type={remainingTime.days != 0 ? "Minutes" : "Seconds"}
          date={
            remainingTime.days != 0
              ? remainingTime.minutes.toString().padStart(2, "0")
              : remainingTime.seconds.toString().padStart(2, "0")
          }
        />
      </div>
      {displayDate && (
        <div className="flex items-center gap-1 md:gap-2">
          <span
            className={cn(
              "inline-block text-xl md:text-2xl font-[500] pt-5 md:pt-5 text-white font-josefin-sans",
              classNameType
            )}
          >
            {dateTime.date}
          </span>
        </div>
      )}
    </div>
  );
};
