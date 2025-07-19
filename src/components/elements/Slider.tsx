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
    <div className="flex flex-col lg:flex-row-reverse justify-center items-center gap-3 px-2">
      <div className="w-82 h-45 md:w-145 md:h-80 lg:w-141 lg:h-92 bg-gradient-kiwi p-[2px] rounded-lg">
        <img
          src={images[0].src}
          alt={images[0].alt}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="overflow-hidden w-82 lg:h-91 md:w-145 lg:w-39">
        <div className="flex lg:flex-col gap-3 w-max infinite-scroll">
          {[...images.slice(1), ...images.slice(1)].map((img, i) => (
            <div
              key={i + 1}
              className="w-17 h-11 md:w-26 md:h-20 lg:w-39 lg:h-25 bg-gradient-kiwi p-[2px] rounded-lg"
              onClick={() => swap((i % (images.length - 1)) + 1)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="object-cover w-full h-full rounded-lg hover:brightness-90"
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .infinite-scroll {
          animation: infinite-scroll-horizontal 10s linear infinite;
        }

        .infinite-scroll:hover {
          animation-play-state: paused;
        }

        @media (min-width: 1024px) {
            .infinite-scroll {
              animation: infinite-scroll-vertical 10s linear infinite;
            }
          }

        @keyframes infinite-scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 6px));
          }
        }

        @keyframes infinite-scroll-vertical {
          0% {
          transform: translateY(0);
          }
          100% {
          transform: translateY(calc(-50% - 6px));
          }
        }`}</style>
    </div>
  );
};

export default Slider;
