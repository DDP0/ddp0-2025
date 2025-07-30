import SectionCalendar from "./section/Calendar";
import { MainSection } from "./section/MainSection";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HomeTabs = () => {
  return (
    <div className="grid grid-cols-[2fr_1fr] animate-fade-in transition-all duration-300 max-lg:grid-cols-1 gap-6">
      <div className="w-full">
        <div className="hidden max-lg:flex">
          <Link href="/dashboard/materi" className="w-full mb-4">
            <Button className="font-josefin-sans w-full rounded-md" variant={"kiwi"}>
              Lihat Materi & Tugas
            </Button>
          </Link>
        </div>
        <MainSection />
      </div>
      <div className="w-full">
        <SectionCalendar />
      </div>
    </div>
  );
};
export default HomeTabs;
