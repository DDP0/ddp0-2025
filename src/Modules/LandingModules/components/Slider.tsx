"use client";
import React, { useState } from "react";

interface Image {
  src: string;
  alt: string;
}

interface SliderProps {
  initialImages: Image[];
}

const Slider: React.FC<SliderProps> = ({ initialImages }) => {
  const [images, setImages] = useState(initialImages);

  const swap = (index: number) => {
    const newImages = [...images];
    [newImages[0], newImages[index]] = [newImages[index], newImages[0]];
    setImages(newImages);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="w-82 h-45 bg-gradient-kiwi p-[2px] rounded-lg">
        <img
          src={images[0].src}
          alt={images[0].alt}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="overflow-hidden w-82">
        <div className="flex gap-3 w-max infinite-scroll">
          {[...images.slice(1), ...images.slice(1)].map((img, i) => (
            <div
              key={i + 1}
              className="w-17 h-11 bg-gradient-kiwi p-[2px] rounded-lg"
              onClick={() => swap((i % 6) + 1)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .infinite-scroll {
          animation: infinite-scroll 10s linear infinite;
        }

        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 6px));
          }`}</style>
    </div>
  );
};

export default Slider;
