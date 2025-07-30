"use client";
import React, { useState, useEffect } from "react";
import { Countdown } from "../../../components/countdown";
import { MentorMenteeList } from "../../../components/kelompok";
import { TodoList } from "../../../components/todo";

export const MainSection = () => {
  const targetDate = new Date("2025-07-31T13:30:00+07:00");

  const [expired, setExpired] = useState(() => {
    return new Date() > targetDate;
  });

  useEffect(() => {
    if (!expired) {
      const timer = setInterval(() => {
        if (new Date() > targetDate) {
          setExpired(true);
          clearInterval(timer);
        }
      }, 1000 * 60);
      return () => clearInterval(timer);
    }
  }, [expired, targetDate]);

  return (
    <div className="w-full flex flex-col items-start space-y-12 font-josefin-sans">
      <section className="w-full flex flex-col gap-4">
        <h4 className="font-josefin-sans text-center text-h4 max-lg:text-h4-mobile">
          {new Date() < targetDate ? "Pengumuman Kelompok" : "Kelompok"}
        </h4>
        <div className="w-full flex justify-center">
          {!expired ? (
            <Countdown
              targetDate={targetDate}
              displayDate={true}
              onComplete={() => {
                setExpired(true);
              }}
            />
          ) : (
            <MentorMenteeList />
          )}
        </div>
      </section>

      <section className="w-full">
        <h4 className="font-josefin-sans mb-2 text-h4 max-lg:text-h4-mobile">
          To Do List
        </h4>
        <div className="w-full flex justify-center">
          <TodoList />
        </div>
      </section>
    </div>
  );
};
