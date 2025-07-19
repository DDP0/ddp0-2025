import React from "react";
import Image from "next/image";

const TestimonialCard = ({
  img,
  name,
  desc,
  testimony,
}: {
  img: string;
  name: string;
  desc: string;
  testimony: string;
}) => {
  return (
    <div className="relative max-w-md w-full scale-[0.95] sm:scale-100 transition-transform duration-300 ease-in-out">
      {/* Main Card */}
      <div className="relative z-40 flex flex-col justify-start items-center opacity-[99%] bg-black/40  border border-white/20 rounded-2xl p-6 sm:p-8 pb-14 shadow-2xl ring-1 ring-white/10 min-h-[22rem] overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:pointer-events-none before:bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_80%)] before:opacity-40 before:blur-md before:z-10">
        {/* Quote Symbol */}
        <div className="text-5xl sm:text-6xl font-serif mb-4 sm:mb-6">
          <Image src="/testimonial_quotes.svg" width={60} height={60} alt="" />
        </div>

        {/* Testimonial Text */}
        <div className="text-white/90 text-sm sm:text-base h-60 no-scrollbar overflow-y-scroll leading-relaxed mb-8 text-center font-josefin-sans">
          <p>{testimony}</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="absolute -bottom-8 -left-6 sm:-left-8 flex items-center z-50">
        <div className="w-20 h-20 sm:w-26 sm:h-26 rounded-full bg-gradient-linear-white from-purple-400 to-pink-400 p-0.5 shadow-lg">
          <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
            <img
              src={img}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="ml-4 sm:ml-6 text-white mb-12 md:mb-8">
          <h3 className="font-semibold text-base sm:text-lg font-josefin-sans">
            {name}
          </h3>
          <p className="text-white/70 text-xs sm:text-sm font-josefin-sans">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
