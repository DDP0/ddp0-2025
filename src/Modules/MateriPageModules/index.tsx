"use client";
import { useEffect, useState } from "react";
import type { WeekWithTasks } from "./types";
import { ModuleCard } from "./components/ModuleCard";
import Loader from "@/components/elements/Loader";
import Background from "../RegistModules/Background";
import { EmptyStateToDo } from "../DashboardModules/components/empty-state-todo";

export default function MateriPageModules() {
  const [weeks, setWeeks] = useState<WeekWithTasks[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/materi")
      .then((res) => res.json())
      .then((data) => setWeeks(data.weeks || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen relative text-white px-4 py-10 sm:px-5 md:px-10 lg:px-20 pt-40 overflow-y-hidden font-josefin-sans">
      <Background />
      {weeks.length === 0 ? (
        <EmptyStateToDo message="Tidak ada materi yang tersedia" />
      ) : (
        weeks.map((weekData, i) => {
          // Separate tasks by type for this week
          const materi = weekData.tasks.find((t) => t.tipe === "MATERI");
          const miniQuiz = weekData.tasks.find((t) => t.tipe === "MINIQUIZ");
          const lab = weekData.tasks.find((t) => t.tipe === "LAB");
          const tp = weekData.tasks.find((t) => t.tipe === "TP");
          const isLast = i === weeks.length - 1;

          return (
            <div key={weekData.week} className="">
              {/* Timeline with Week Header */}
              <div className="flex items-start mb-6 ">
                <div className="relative flex flex-col items-center mr-6 min-w-[40px] ">
                  {/* Week Circle */}
                  <div className="relative -translate-x-2 lg:translate-x-0  z-10 w-14 h-14 rounded-2xl flex items-center justify-center bg-[#494949] border border-[#cfcfcfb1]">
                    <span className="text-white max-md:text-lg text-2xl font-bold leading-tight">
                      {weekData.week}
                    </span>
                  </div>

                  {/* Continuous vertical line that goes through entire section */}
                  {!isLast && (
                    <div className="">
                      <div className="absolute top-10 left-1/3 lg:left-1/2 -translate-x-1/2 w-2 glass shadow-xl border-[#ffffff59] border-1 -z-10 h-[200vh] :h-[100vh] rounded-xl pt-4" />
                    </div>
                  )}
                </div>

                {/* Week Title */}
                <h2 className="text-2xl font-bold text-white pt-2">
                  Week {weekData.week}
                </h2>
              </div>

              {/* Content */}
              <div className="ml-8 sm:ml-16 space-y-3 sm:space-y-4 pb-10 sm:pb-16">
                {materi && <ModuleCard task={materi} variant="materi" />}
                {(miniQuiz || lab) && (
                  <div className="w-full flex flex-col lg:flex-row gap-4">
                    {miniQuiz && (
                      <div className="flex-1">
                        <ModuleCard task={miniQuiz} variant="miniQuiz" />
                      </div>
                    )}
                    {lab && (
                      <div className="flex-1">
                        <ModuleCard task={lab} variant="lab" />
                      </div>
                    )}
                  </div>
                )}
                {tp && <ModuleCard task={tp} variant="tp" />}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
