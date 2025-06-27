import Countdown from "@/components/elements/Countdown";
import { Button } from "@/components/ui/button";
import { ChevronRight, Search } from "lucide-react";

const CountdownSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col gap-8 justify-center items-center font-josefin-sans">
      <img src="/swirl.webp" alt="swirl" className="absolute" />
      <h1 className="text-h1">Countdown</h1>
      <div className="flex flex-col gap-4 items-center border border-border/20 rounded-3xl bg-gradient-to-r from-islan-milde-500/20 to-aurora-green-500/20 backdrop-blur-md px-20 py-8">
        <h1 className="text-h5 opacity-80">Kelompok Mentoring</h1>
        <Countdown targetDate={new Date("July 28, 2025 23:59:59")} />
        <h1 className="opacity-80">28 Jul 2025, 23:59 WIB</h1>
        <Button>
          <Search />
          Discover Your Team!
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
};

export default CountdownSection;
