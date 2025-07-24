"use client";
import { useToast } from "@/hooks/useToast";
import Image from "next/image";
import { useState, useEffect } from "react";

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

export const MainSectionMentor = () => {
  const toast = useToast();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch kelompok data from API
  useEffect(() => {
    const fetchKelompokData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/dashboard/kelompok");

        if (!response.ok) {
          throw new Error(`Failed to fetch kelompok data: ${response.status}`);
        }

        const kelompokData = await response.json();
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

  const handleCopy = async (text: string, index: number) => {
    try {
      toast.show("success", "Berhasil copy Id Line");
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      toast.show("loading", "Gagal copy Id Line");
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      {loading && (
        <div className="text-center py-8">
          <p className="font-josefin-sans text-bodyLarge">
            Loading kelompok data...
          </p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="font-josefin-sans text-bodyLarge text-red-500">
            Error: {error}
          </p>
        </div>
      )}

      {!loading && !error && data && (
        <>
          <h1 className="font-josefin-sans text-h4 font-semibold mb-2 sm:mb-4">
            {data.name}
          </h1>
          <div className="w-full h-fit rounded-lg sm:rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-3 sm:p-6 font-josefin-sans text-body sm:text-bodyLarge">
            <div className="grid space-y-1.5 sm:space-y-3">
              <h2>Mentor</h2>
              {data.mentors.map((mentor, index) => (
                <div
                  key={index}
                  className="w-full h-fit rounded-lg sm:rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-2 sm:p-3 truncate"
                >
                  {mentor.name}
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
                      onClick={() => handleCopy(mentee.idLine, index)}
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
