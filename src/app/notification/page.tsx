import Notification from "@/Modules/DashboardModules/Notification";

const NotificationPage = () => {
  return (
    <main className="relative min-h-screen flex flex-col bg-black/80 pt-28 overflow-hidden">
      {/* Swirl background */}
      <img
        src="/swirl.webp"
        alt="swirl background"
        className="pointer-events-none select-none absolute left-0 bottom-0 w-full max-w-none h-auto z-0 opacity-80"
        style={{ objectFit: 'cover' }}
      />
      {/* Mobile: sidebar on top, then notif; Desktop: sidebar left, notif right */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-start justify-center gap-6 max-w-[1280px] mx-auto px-2 md:px-0">
        {/* Sidebar placeholder (216px) */}
        <div className="w-full md:w-[216px] mb-4 md:mb-0">
          {/* On mobile, this is the top bar; on desktop, sidebar */}
          <div className="h-12 bg-black/30 rounded-xl flex items-center justify-center md:justify-start text-white font-josefin-sans text-lg md:text-left text-center">
            Sidebar
          </div>
        </div>
        {/* Main notification content (1040px) */}
        <div className="w-full md:w-[1040px] flex flex-col justify-start items-center md:items-start gap-4 px-2 sm:px-4 lg:px-0" style={{maxWidth: '100vw', boxSizing: 'border-box'}}>
          <h1 className="text-h2 text-white font-josefin-sans mb-8 mt-2 text-center md:text-left">Notification</h1>
          <Notification showDescription={true} />
        </div>
      </div>
    </main>
  );
};

export default NotificationPage; 