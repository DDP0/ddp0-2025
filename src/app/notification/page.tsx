import Notification from "@/Modules/DashboardModules/Notification";

const NotificationPage = () => {
  return (
    <main className="relative min-h-screen flex flex-col bg-black/80 pt-28 md:pl-[220px] md:pr-8 overflow-hidden">
      {/* Swirl background */}
      <img
        src="/swirl.webp"
        alt="swirl background"
        className="pointer-events-none select-none absolute left-0 bottom-0 w-full max-w-none h-auto z-0 opacity-80"
        style={{objectFit: 'cover'}}
      />
      <div className="relative z-10 w-full flex flex-col items-start max-w-5xl mx-auto px-2 md:px-0">
        <h1 className="text-h2 text-white font-josefin-sans mb-8 mt-2">Notification</h1>
        <Notification showDescription={true} />
      </div>
    </main>
  );
};

export default NotificationPage; 