import { MainSectionMentor } from "./section/MainSectionMentor";
import SectionCalendar from "@/Modules/DashboardModules/tabs/HomeTabs/section/Calendar";

const HomeTabsMentor = () => {
  return (
    <div className="grid grid-cols-[2fr_1fr] animate-fade-in transition-all duration-300 max-lg:grid-cols-1 gap-6">
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
