import TestimonialCard from "@/components/elements/TestimonialsCard";
import Image from "next/image";
const testimonies = [
  {
    img: "/testimony/faiq.jpg",
    name: "Ahmad Faiq Fawwaz",
    desc: "Ilmu Komputer '24",
    testimony:
      "DDP-0 IS FUN!! apalagi ddp-0 ini sangat membantu bagi gw yang 0 besar dalam dunia perkodingan saat pertama kali masuk pacil dan gw juga bisa dapet insight dari mentor gw yang asik 😆",
  },
  {
    img: "/testimony/faiq.jpg",
    name: "Ahmad Faiq Fawwaz",
    desc: "Ilmu Komputer '24",
    testimony:
      "DDP-0 IS FUN!! apalagi ddp-0 ini sangat membantu bagi gw yang 0 besar dalam dunia perkodingan saat pertama kali masuk pacil dan gw juga bisa dapet insight dari mentor gw yang asik 😆",
  },
  {
    img: "/testimony/faiq.jpg",
    name: "Ahmad Faiq Fawwaz",
    desc: "Ilmu Komputer '24",
    testimony:
      "DDP-0 IS FUN!! apalagi ddp-0 ini sangat membantu bagi gw yang 0 besar dalam dunia perkodingan saat pertama kali masuk pacil dan gw juga bisa dapet insight dari mentor gw yang asik 😆",
  },
  {
    img: "/testimony/faiq.jpg",
    name: "Ahmad Faiq Fawwaz",
    desc: "Ilmu Komputer '24",
    testimony:
      "DDP-0 IS FUN!! apalagi ddp-0 ini sangat membantu bagi gw yang 0 besar dalam dunia perkodingan saat pertama kali masuk pacil dan gw juga bisa dapet insight dari mentor gw yang asik 😆",
  },
];

const TestimonyPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center overflow-hidden py-16 pb-40 relative">
      <Image
        src="/aurora_full.svg"
        alt="aurora"
        width={1000}
        height={1000}
        className="absolute bottom-30 sm:bottom-0 md:-bottom-30 right-0 z-0 pointer-events-none animate-pulse opacity-80"
      />

      {/* Section Title */}
      <h1 className="text-h2 md:text-h1 z-10 font-josefin-sans pb-16 text-center">
        Testimony
      </h1>

      <div className="relative w-full z-10 pb-24">
        <div
          className="flex animate-marquee gap-8 sm:gap-16"
          style={{ width: "max-content" }}
        >
          {[...testimonies, ...testimonies, ...testimonies].map((item, idx) => (
            <div
              key={idx}
              className="w-[280px] hover:scale-110 sm:w-[300px] duration-1000 md:w-[320px] flex-shrink-0"
            >
              <TestimonialCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonyPage;
