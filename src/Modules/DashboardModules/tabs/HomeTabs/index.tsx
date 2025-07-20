import SectionCalendar from "./section/Calendar";

const HomeTabs = () => {
  return (
    <div className="grid grid-cols-[2fr_1fr] animate-fade-in transition-all duration-300 max-lg:grid-cols-1 gap-6">
      <div className="w-full h-100 bg-white"></div>
      <div className="w-full">
        <SectionCalendar />
      </div>
    </div>
  );
};
export default HomeTabs;
