import Calendar from "./Calendar";
import Notification from "./Notification";

const DashboardModules = () => {
  return (
    <main className="min-h-screen flex justify-center items-start gap-8 p-8 bg-black/80">
      {/* Main content placeholder */}
      <div className="flex-1" />
      <div className="flex flex-col gap-8 w-[350px]">
        <Calendar />
        <Notification />
      </div>
    </main>
  );
};
export default DashboardModules;
