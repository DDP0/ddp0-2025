import TestimonialCard from "@/components/elements/TestimonialsCard";
import Image from "next/image";
const testimonies = [
  {
    img: "https://i.pinimg.com/736x/26/99/f9/2699f9f1c925eeb2e35741286c15c6b0.jpg",
    name: "Bilal Lalala",
    desc: "Ilmu Komputer '24",
    testimony:
      "Bagiku mengikuti DDP 0 adalah pengalaman yang amazing spiderman andrew garfield dolor sit amet, consectetur adipiscing elit.",
  },
  {
    img: "https://i.pinimg.com/736x/26/99/f9/2699f9f1c925eeb2e35741286c15c6b0.jpg",
    name: "Bill Lalala",
    desc: "Ilmu Komputer '24",
    testimony:
      "Bagiku mengikuti DDP 0 adalah pengalaman yang amazing spiderman andrew garfield dolor sit amet, consectetur adipiscing elit.",
  },
  {
    img: "https://i.pravatar.cc/300?img=2",
    name: "Sarah Putri",
    desc: "Sistem Informasi '23",
    testimony:
      "Aku belajar banyak banget! DDP0 ngajarin aku coding dari 0, seru banget!",
  },
  {
    img: "https://i.pravatar.cc/300?img=3",
    name: "Dimas Akbar",
    desc: "Ilmu Komputer '22",
    testimony:
      "Pengalamannya luar biasa. Aku jadi ngerti dasar-dasar programming dengan cara yang fun!",
  },
  {
    img: "https://i.pravatar.cc/300?img=4",
    name: "Nadia Fauzan",
    desc: "Ilmu Komputer '25",
    testimony: "Semua tutor dan asisten dosennya keren banget, sabar ngajarin!",
  },
  {
    img: "https://i.pravatar.cc/300?img=5",
    name: "Reza Maulana",
    desc: "Teknik Komputer '23",
    testimony:
      "Setiap minggu selalu excited buat ikut kelasnya! Materinya jelas dan bermanfaat.",
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

      <div className="relative w-full overflow-hidden z-10 pb-24">
        <div className="flex animate-marquee gap-8 sm:gap-16 w-max px-4">
          {[...testimonies, ...testimonies].map((item, idx) => (
            <div
              key={idx}
              className="w-[280px] sm:w-[300px] md:w-[320px] flex-shrink-0"
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
