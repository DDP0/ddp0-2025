"use client";
import React, { useState, useEffect } from "react";
import { Countdown } from "../components/countdown";
import { MentorMenteeList } from "../components/kelompok";
import { TodoList } from "../components/todo";

export const HomeTabs = () => {
  
  const targetDate = new Date("2025-10-10T00:00:00Z");

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
    <div className="w-full flex flex-col items-start space-y-12">
      <section className="w-full">
        <h1 className="text-3xl font-josefin-sans font-semibold mb-4">
          Kelompok
        </h1>
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
        <h1 className="text-3xl font-josefin-sans font-semibold mb-4">
          To Do List
        </h1>
        <div className="w-full flex justify-center">
          <TodoList />
        </div>
      </section>
    </div>
  );
};
