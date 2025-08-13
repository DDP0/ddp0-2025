"use client";
import { useState } from "react";
import CocoLineArrow from "./CocoLineArrowRight"; // adjust path if needed

export default function ImageCarousel({ images }: { images: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      <div className="relative h-[400px] rounded-lg flex items-center justify-center">
        {/* Left button */}
        <button
          onClick={handlePrev}
          className="absolute left-[-2rem] z-10 text-2xl p-2 rounded-full hover:bg-white/10 transition"
        >
          <CocoLineArrow className="rotate-180 size-10" />
        </button>

        {/* Image with transition */}
        <div className="relative bg-gray-300 h-[400px] w-full rounded-md overflow-hidden flex items-center justify-center">
          <img
            key={selectedIndex}
            src={images[selectedIndex]}
            alt={`image-${selectedIndex}`}
            className="max-h-full max-w-full object-contain transition-all duration-500 ease-in-out"
          />
        </div>

        {/* Right button */}
        <button
          onClick={handleNext}
          className="absolute right-[-2rem] z-10 text-2xl p-2 rounded-full hover:bg-white/10 transition"
        >
          <CocoLineArrow className="size-10" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex flex-wrap gap-2 mt-4 items-center justify-center max-w-full">
        {images.map((img, i) => (
          <div
            key={i}
            className={`h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] rounded-md overflow-hidden cursor-pointer transition border-2 ${
              i === selectedIndex
                ? "border-blue-500 scale-105"
                : "border-transparent hover:border-blue-300"
            }`}
            onClick={() => setSelectedIndex(i)}
          >
            <img
              src={img}
              alt={`thumb-${i}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
