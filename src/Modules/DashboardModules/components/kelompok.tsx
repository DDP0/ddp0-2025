"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Copy } from "lucide-react";
import Loader from "@/components/elements/Loader";

interface Mentor {
  name: string;
  lineId: string;
}

interface ResponseData {
  mentors: Mentor[];
  mentees: string[];
}

const cardBaseStyle = {
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderImageSource:
    "linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(35.22deg, rgba(255, 255, 255, 0) 33.61%, #FFFFFF 89.19%)",
  backdropFilter: "blur(20px)",
  boxShadow:
    "0px 32px 64px 0px #0000001A, 0px 16px 32px 0px #0000000D, 0px 4px 8px 0px #0000000D, 0px 48px 100px 0px #FFFFFF26 inset",
} as const;

const containerStyle = {
  background: "var(--Card, #1010101A)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  borderImageSource:
    "linear-gradient(0deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.08)), linear-gradient(35.22deg, rgba(255, 255, 255, 0) 33.61%, #FFFFFF 89.19%)",
  backdropFilter: "blur(20px)",
  boxShadow:
    "0px 32px 64px 0px #0000001A, 0px 16px 32px 0px #0000000D, 0px 4px 8px 0px #0000000D, 0px 48px 100px 0px #FFFFFF26 inset",
} as const;

const copyIconStyle = {
  transform: "scaleX(-1) scaleY(1.2)",
} as const;

const MentorItem = React.memo(({ mentor }: { mentor: Mentor }) => {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(mentor.lineId);
  }, [mentor.lineId]);

  return (
    <div className="flex gap-4">
      <div
        className="w-[70%] bg-[#1010101A] backdrop-blur-xl border rounded-lg px-4 py-3 hover:bg-[#ffffff12] transition-all duration-300 transform"
        style={cardBaseStyle}
      >
        <span className="text-white font-josefin-sans font-[400] ">
          {mentor.name}
        </span>
      </div>
      <div
        className="w-[30%] bg-[#1010101A] backdrop-blur-xl border rounded-lg px-4 py-3 flex justify-between items-center hover:bg-[#ffffff12] transition-all duration-300 transform"
        style={cardBaseStyle}
      >
        <span className="text-white font-josefin-sans font-[400]">
          {mentor.lineId}
        </span>
        <button
          onClick={handleCopy}
          className="p-1 hover:bg-white/20 rounded cursor-pointer"
          aria-label={`Copy ${mentor.lineId}`}
        >
          <Copy
            size={20}
            className="text-white opacity-80"
            style={copyIconStyle}
          />
        </button>
      </div>
    </div>
  );
});

MentorItem.displayName = "MentorItem";

const MenteeItem = React.memo(({ mentee }: { mentee: string }) => (
  <div
    className="bg-[#1010101A] backdrop-blur-xl border rounded-lg px-4 py-3 hover:bg-[#ffffff12] transition-all duration-300 transform"
    style={cardBaseStyle}
  >
    <span className="text-white font-josefin-sans font-400">{mentee}</span>
  </div>
));

MenteeItem.displayName = "MenteeItem";

export const MentorMenteeList = () => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard/kelompok");

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json: ResponseData = await res.json();

        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An error occurred");
          setData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <p className="text-red-400">Error: {error}</p>;
  }

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <div
      className="w-full rounded-xl p-6 space-y-8 backdrop-blur-md"
      style={containerStyle}
    >

      <div className="space-y-4">
        <h2 className="text-lg font-josefin-sans font-[500]">Mentor</h2>
        <div className="flex flex-col gap-4">
          {data.mentors.map((mentor, idx) => (
            <MentorItem
              key={`${mentor.name}-${mentor.lineId}-${idx}`}
              mentor={mentor}
            />
          ))}
        </div>
      </div>


      <div className="space-y-4">
        <h2 className="text-lg font-josefin-sans font-500">Mentee</h2>
        <div className="space-y-3">
          {data.mentees.map((mentee, idx) => (
            <MenteeItem key={`${mentee}-${idx}`} mentee={mentee} />
          ))}
        </div>
      </div>
    </div>
  );
};
