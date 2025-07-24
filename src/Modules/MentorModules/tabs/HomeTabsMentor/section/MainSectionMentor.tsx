"use client";
import { useToast } from "@/hooks/useToast";
import Image from "next/image";
import { useState } from "react";

interface Data {
  mentors: string[];
  mentees: Mentee[];
}

interface Mentee {
  name: string;
  idLine: string;
}

const data: Data = {
  mentors: ["Muhammad Hakim Nizami", "Naufal Zafran Fadil"],
  mentees: [
    { name: "Mentee Mentee Mentee Mentee Mentee", idLine: "menteesatu" },
    { name: "Mentee 2", idLine: "menteedua" },
    { name: "Mentee 3", idLine: "menteetiga" },
    { name: "Mentee 4", idLine: "menteeempat" },
  ],
};

export const MainSectionMentor = () => {
  const toast = useToast();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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
      <h1 className="font-josefin-sans text-h4 font-semibold mb-4">
        Kelompok 00
      </h1>
      <div className="w-full h-fit rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-6 font-josefin-sans text-body sm:text-bodyLarge">
        <div className="grid gap-3">
          <h2>Mentor</h2>
          {data.mentors.map((mentor, index) => (
            <div
              key={index}
              className="w-full h-fit rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-2 sm:p-3 truncate"
            >
              {mentor}
            </div>
          ))}
          <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr] gap-3">
            <h2>Mentee</h2>
            <h2 className="max-sm:hidden">Id Line</h2>
          </div>
          {data.mentees.map((mentee, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_auto] sm:grid-cols-[2fr_1fr] gap-2 sm:gap-3"
            >
              <div
                key={index}
                className="w-full h-fit rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-2 sm:p-3 truncate"
              >
                {mentee.name}
              </div>
              <div className=" flex justify-between w-full h-fit rounded-xl glass shadow-xl border-[#ffffff59] border-1 p-2 sm:p-3">
                <span className="max-sm:hidden">{mentee.idLine}</span>
                <Image
                  className="cursor-pointer shrink-0"
                  src="/rectangle.svg"
                  alt="Copy"
                  width={18}
                  height={18}
                  onClick={() => handleCopy(mentee.idLine, index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
