"use client";

import SidebarMobile from "./sidebar/SidebarMobile";
import SidebarDesktop from "./sidebar/SidebarDesktop";

import { useEffect, useState } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export default function Sidebar({ isMentor }: { isMentor: boolean }) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [nilai, setNilai] = useState<number>(0);

  useEffect(() => {
    const fetchNilai = async () => {
      try {
        const response = await fetch("/api/dashboard"); // Adjust the API endpoint as needed
        const data: {
          message: string;
          points: number;
        } = await response.json();
        setNilai(data.points);
      } catch (error) {
        console.error("Failed to fetch nilai:", error);
      }
    };

    fetchNilai();
  }, []);

  return isDesktop ? (
    <SidebarDesktop totalNilai={nilai} isMentor={isMentor} />
  ) : (
    <SidebarMobile totalNilai={nilai} />
  );
}
