import Slider from "../../../components/elements/Slider";
import Image from "next/image";

const images: { src: string; alt: string }[] = [
  {
    src: "/meet/1.jpeg",
    alt: "meet",
  },
  {
    src: "/meet/2.jpg",
    alt: "meet",
  },
  {
    src: "/meet/3.jpg",
    alt: "meet",
  },
  {
    src: "/meet/4.jpg",
    alt: "meet",
  },
  {
    src: "/meet/5.jpeg",
    alt: "meet",
  },
  {
    src: "/meet/6.jpg",
    alt: "meet",
  },
  {
    src: "/meet/7.jpg",
    alt: "meet",
  },
  {
    src: "/meet/8.jpg",
    alt: "meet",
  },
  {
    src: "/meet/9.jpg",
    alt: "meet",
  },
];

export default function WhatIsDDP0() {
  return (
    <section
      id="about"
      className="relative flex flex-col justify-center gap-13 my-16"
    >
      <div className="flex flex-col relative lg:flex-row justify-center items-center gap-12 w-full px-4">
        <div className="flex flex-col gap-12 lg:gap-14 px-10 w-100 md:w-160 lg:w-117 lg:px-0">
          <h1 className="font-josefin-sans text-h1-mobile md:text-h1 text-center lg:text-left">
            What Is{" "}
            <span className="bg-gradient-retro-wave bg-clip-text text-transparent">
              DDP-0?
            </span>
          </h1>
          <div>
            <p className="text-headline-mobile lg:text-h5 font-josefin-sans text-center lg:text-left">
              DDP-0 adalah program pembekalan dari COSMIC 2024 untuk
              memperkenalkan konsep dasar pemrograman kepada mahasiswa baru CSUI
              2025, sebagai bekal menghadapi perkuliahan di Fasilkom UI
            </p>
            <br />
            <p className="text-headline-mobile lg:text-h5 font-josefin-sans text-center lg:text-left">
              Melalui program ini, mahasiswa baru CSUI 2025 diharapkan dapat
              membangun fondasi yang kuat dan lebih percaya diri menghadapi
              dunia pemrograman di bangku kuliah.
            </p>
          </div>
        </div>
        <Slider initialImages={images} />
      </div>

      <div className="absolute w-full h-full translate-y-1/2 md:translate-y-3/8 -z-10 lg:hidden">
        <Image src="/Subtract.svg" alt="subtract" fill />
      </div>
      <div className="absolute w-full h-full translate-y-1/2 -z-10 invisible lg:visible">
        <Image src="/Subtract-lg.svg" alt="subtract" fill />
      </div>
    </section>
  );
}
