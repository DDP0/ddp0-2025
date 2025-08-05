import Link from "next/link";
import { MainSectionMentor } from "./section/MainSectionMentor";
import SectionCalendar from "@/Modules/DashboardModules/tabs/HomeTabs/section/Calendar";
import { Button } from "@/components/ui/button";

const HomeTabsMentor = () => {
  return (
    <div className="grid grid-cols-[2fr_1fr] animate-fade-in transition-all duration-300 max-lg:grid-cols-1 gap-6">
      <Link href="/dashboard/materi" className="w-full mb-4 hidden max-lg:flex">
        <Button
          className="font-josefin-sans w-full rounded-md"
          variant={"kiwi"}
        >
          Lihat Materi & Tugas
        </Button>
      </Link>
      <div className="w-full">
        <MainSectionMentor />
      </div>
      <div className="w-full">
        <SectionCalendar />
      </div>
    </div>
  );
};
export default HomeTabsMentor;
