import SectionCalendar from "./section/Calendar";
import { MainSection } from "./section/MainSection";

const HomeTabs = () => {
  return (
    <div className="grid grid-cols-[2fr_1fr] animate-fade-in transition-all duration-300 max-lg:grid-cols-1 gap-6">
      <div className="w-full">
        <MainSection />
      </div>
      <div className="w-full">
        <SectionCalendar />
      </div>
    </div>
  );
};
export default HomeTabs;
