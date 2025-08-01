import Countdown from "@/components/elements/Countdown";
import { Button } from "@/components/ui/button";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { registerDate } from "@/Modules/RegistModules";

const CountdownSection = () => {
  return (
    <section className="relative max-md:mb-24 md:aspect-video flex flex-col gap-6 md:gap-8 justify-center items-center font-josefin-sans overflow-x-clip">
      <div className="w-1/6 aspect-square rounded-full blur-3xl absolute -left-24 top-1/2 -translate-y-2/3 bg-gradient-retro-button max-md:hidden" />
      <div className="w-1/6 aspect-square rounded-full blur-3xl absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-[#18357A] max-md:hidden" />

      <div className="absolute bottom-0 max-md:hidden w-full h-full animate-pulse">
        <Image src="/swirl.webp" alt="swirl" fill />
      </div>
      <div className="w-[30rem] absolute bottom-0 translate-y-1/2 md:hidden">
        <Image src="/shade.webp" alt="shade" fill />
      </div>
      <div className="absolute w-1/4 left-0 -translate-x-1/2 translate-y-1/3 max-md:hidden">
        <Image src="/buwlan.webp" alt="buwlan" fill />
      </div>

      <h1 className="text-h2 md:text-h1 z-10">Countdown</h1>
      <div className="flex flex-col gap-4 items-center border border-border/20 rounded-3xl bg-gradient-to-r from-islan-milde-500/20 to-aurora-green-500/20 backdrop-blur-md px-8 md:px-20 py-6 md:py-8">
        <h1 className="text-h5 opacity-80">DDP0 Registration</h1>
        <Countdown targetDate={registerDate} displayDate={true} />
        {/* <h1 className="opacity-80">28 Jul 2025, 23:59 WIB</h1> */}
        <Link href="/register">
          <Button>
            <Search />
            Register Now
            <ChevronRight />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CountdownSection;
