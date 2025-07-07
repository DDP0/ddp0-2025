import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative min-h-[120vh] max-sm:min-h-[140vh] flex items-center justify-center overflow-hidden">
      <div className="absolute right-0 bottom-0 w-64 h-64 lg:w-180 lg:h-180 z-20">
        <div className="relative w-full h-full">
          <Image
            src="/moon.png"
            alt="moon"
            fill
            className="object-contain object-bottom-right -scale-x-100"
            priority
          />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-glacial-lilac-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-instrasigent-sea-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/5 w-64 h-64 bg-aurora-green-500/6 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/6 right-2/5 w-48 h-48 bg-glacial-lilac-300/5 rounded-full blur-xl" />
        <div className="absolute bottom-1/5 right-1/3 w-56 h-56 bg-instrasigent-sea-300/8 rounded-full blur-2xl" />
        <div
          className="absolute top-0 right-[-36px] w-72 h-72 bg-yellow-100/20 rounded-full blur-2xl animate-pulse"
          style={{ right: "-9rem" }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-20 right-1/3 w-1 h-1 bg-white rounded-full opacity-80 shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
        <div className="absolute top-32 right-1/2 w-0.5 h-0.5 bg-white rounded-full opacity-60 shadow-[0_0_2px_rgba(255,255,255,0.3)]" />
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-70 shadow-[0_0_3px_rgba(255,255,255,0.4)]" />
        <div className="absolute bottom-1/3 right-1/3 w-0.5 h-0.5 bg-white rounded-full opacity-80 shadow-[0_0_2px_rgba(255,255,255,0.3)]" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white rounded-full opacity-60 shadow-[0_0_3px_rgba(255,255,255,0.3)]" />
        <div className="absolute top-1/3 left-2/3 w-0.5 h-0.5 bg-white rounded-full opacity-70 shadow-[0_0_2px_rgba(255,255,255,0.3)]" />
        <div className="absolute bottom-1/2 right-1/6 w-1 h-1 bg-white rounded-full opacity-80 shadow-[0_0_4px_rgba(255,255,255,0.5)]" />

        <svg
          className="absolute animate-star-orbit top-24 right-1/3 w-48 h-36 opacity-70 drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]"
          viewBox="0 0 192 144"
        >
          <defs>
            <filter id="glow1">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g stroke="white" strokeWidth="0.75" fill="none" filter="url(#glow1)">
            <line x1="15" y1="30" x2="45" y2="15" />
            <line x1="45" y1="15" x2="75" y2="37.5" />
            <line x1="75" y1="37.5" x2="105" y2="22.5" />
            <line x1="105" y1="22.5" x2="127.5" y2="45" />
          </g>
          <g fill="white" filter="url(#glow1)">
            <circle cx="15" cy="30" r="1.5" />
            <circle cx="45" cy="15" r="2.25" />
            <circle cx="75" cy="37.5" r="1.5" />
            <circle cx="105" cy="22.5" r="1.5" />
            <circle cx="127.5" cy="45" r="2.25" />
          </g>
        </svg>

        <svg
          className="absolute animate-constellation-move top-1/3 right-1/4 w-36 h-30 opacity-60 drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]"
          viewBox="0 0 144 120"
        >
          <defs>
            <filter id="glow2">
              <feGaussianBlur stdDeviation="1" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g stroke="white" strokeWidth="0.75" fill="none" filter="url(#glow2)">
            <line x1="22.5" y1="45" x2="52.5" y2="30" />
            <line x1="52.5" y1="30" x2="37.5" y2="67.5" />
            <line x1="37.5" y1="67.5" x2="67.5" y2="75" />
          </g>
          <g fill="white" filter="url(#glow2)">
            <circle cx="22.5" cy="45" r="1.5" />
            <circle cx="52.5" cy="30" r="2.25" />
            <circle cx="37.5" cy="67.5" r="1.5" />
            <circle cx="67.5" cy="75" r="1.5" />
          </g>
        </svg>
      </div>

      <div className="relative z-30 container mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-1 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-h1-mobile md:text-h2 lg:text-h1 font-josefin-sans leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                <span className="relative inline-block w-full max-sm:w-[90%]">
                  <span
                    className="bg-gradient-retro-wave bg-clip-text text-transparent whitespace-pre-line"
                    style={{
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      display: "inline-block",
                      width: "100%",
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    Dasar-Dasar Pemrograman 0
                  </span>
                </span>
              </h1>
              <p className="text-headline-mobile md:text-headline lg:text-h3 text-white font-josefin-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
                Presented By Cosmic 2024
              </p>
            </div>

            <div className="space-y-8 pt-8">
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-josefin-sans leading-tight max-w-3xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] mx-auto lg:mx-0">
                DDP-0 adalah program pembekalan dari COSMIC 2024 untuk
                memperkenalkan konsep dasar pemrograman kepada mahasiswa baru
                CSUI 2025, sebagai bekal menghadapi perkuliahan di Fasilkom UI.
              </p>
            </div>

            <div className="pt-4 flex justify-center lg:justify-start">
              <Link href="/register">
                <Button
                  variant="retro"
                  size="lg"
                  className="text-bodyLarge-mobile md:text-bodyLarge font-semibold px-16 py-4 min-w-[220px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:drop-shadow-[0_6px_16px_rgba(0,0,0,0.4)] transition-all duration-300"
                >
                  <Image
                    src="/card.svg"
                    alt="Background"
                    width={25}
                    height={25}
                  />
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-96 z-40 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-t from-[#080913] via-[#080913]/20 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
