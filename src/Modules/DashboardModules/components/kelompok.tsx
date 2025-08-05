"use client";
import { useToast } from "@/hooks/useToast";
import Image from "next/image";
import { useState, useEffect } from "react";
import { EmptyStateToDo } from "@/Modules/DashboardModules/components/empty-state-todo";

interface Data {
  name: string;
  mentors: Mentor[];
  mentees: Mentee[];
}

interface Mentor {
  name: string;
  idLine: string;
}

interface Mentee {
  name: string;
  idLine: string;
}

export const MentorMenteeList = () => {
  const toast = useToast();
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch kelompok data from API
  useEffect(() => {
    const fetchKelompokData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/dashboard/kelompok");
        const kelompokData = await response.json();
        if (!response.ok) {
          throw new Error(
            kelompokData.error || "Failed to fetch kelompok data"
          );
        }
        setData(kelompokData);
        setError(null);
      } catch (err) {
        console.error("Error fetching kelompok data:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching kelompok data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchKelompokData();
  }, []);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.show("success", "Berhasil copy Id Line");
    } catch (err) {
      toast.show("loading", "Gagal copy Id Line");
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      {loading && (
        <div className="h-[50vh] overflow-hidden relative flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}

      {error && <EmptyStateToDo message={error} />}

      {!loading && !error && data && (
        <>
          {/* <h1 className="font-josefin-sans text-h4 font-semibold mb-2 sm:mb-4">
            {data.name}
          </h1> */}
          <div className="w-full h-fit rounded-lg sm:rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-3 sm:p-6 font-josefin-sans text-body sm:text-bodyLarge">
            <div className="grid space-y-1.5 sm:space-y-3">
              <h2>Mentor</h2>
              {data.mentors.map((mentor, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr] gap-1.5 sm:gap-3"
                >
                  <div className="w-full h-fit rounded-lg sm:rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-2 sm:p-3 truncate">
                    {mentor.name}
                  </div>
                  <div className=" flex justify-between w-full h-fit rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-2 sm:p-3">
                    <span className="max-sm:hidden">{mentor.idLine}</span>
                    <Image
                      className="cursor-pointer shrink-0"
                      src="/rectangle.svg"
                      alt="Copy"
                      width={14}
                      height={14}
                      onClick={() => handleCopy(mentor.idLine)}
                    />
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr] gap-1.5 sm:gap-3">
                <h2>Mentee</h2>
                <h2 className="max-sm:hidden">Id Line</h2>
              </div>
              {data.mentees.map((mentee, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr] gap-1.5 sm:gap-3"
                >
                  <div className="w-full h-fit rounded-lg sm:rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-2 sm:p-3 truncate">
                    {mentee.name}
                  </div>
                  <div className=" flex justify-between w-full h-fit rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-2 sm:p-3">
                    <span className="max-sm:hidden">{mentee.idLine}</span>
                    <Image
                      className="cursor-pointer shrink-0"
                      src="/rectangle.svg"
                      alt="Copy"
                      width={14}
                      height={14}
                      onClick={() => handleCopy(mentee.idLine)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
