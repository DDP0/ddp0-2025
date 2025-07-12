"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { notifications } from "./notifications";

interface NotificationProps {
  showDescription?: boolean;
}

const colorMap: Record<string, { border: string; text: string }> = {
  purple: {
    border: "linear-gradient(90deg, #c99bdb 0%, #416eb7 100%)",
    text: "#c99bdb",
  },
  yellow: {
    border: "linear-gradient(90deg, #fec888 0%, #ffe29a 100%)",
    text: "#fec888",
  },
  green: {
    border: "linear-gradient(90deg, #9ae7b8 0%, #baffce 100%)",
    text: "#9ae7b8",
  },
};

const Notification: React.FC<NotificationProps> = ({ showDescription = false }) => {
  const router = useRouter();

  if (!showDescription) {
    return (
      <>
        <h2 className="text-h3 text-white font-josefin-sans mt-1">Notification</h2>
        <div className="rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-6 mb-0 shadow-xl w-full max-w-md min-w-[320px] flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {notifications.map((notif) => {
              const color = colorMap[notif.color || 'purple'];
              return (
                <div
                  key={notif.id}
                  className="flex items-center gap-4 rounded-xl px-6 py-4 font-josefin-sans text-base shadow-md bg-black/40 backdrop-blur-xl"
                  style={{
                    border: `2px solid transparent`,
                    background: `linear-gradient(black, black) padding-box, ${color.border} border-box`,
                  }}
                >
                  <div className="font-bold text-lg font-josefin-sans" style={{color: color.text, marginBottom: 0}}>{notif.header}</div>
                </div>
              );
            })}
          </div>
          <Button variant="kiwi" className="w-full mt-2" onClick={() => router.push("/notification")}>See more</Button>
        </div>
      </>
    );
  }

  // On notification page, keep flat style
  return (
    <div className="w-full max-w-5xl min-w-[320px] flex flex-col gap-6 px-2 md:px-0">
      <div className="flex flex-col gap-6">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex flex-col md:flex-row items-start gap-4 md:gap-8 rounded-2xl px-6 py-6 bg-black/40 backdrop-blur-xl shadow-xl border border-white/10 w-full"
            style={{
              // Use a subtle border and shadow for the bubble, matching dashboard
              // borderImage: 'linear-gradient(100deg, #fec888 0%, #9ae7b8 100%) 1',
              // borderStyle: 'solid',
              // borderWidth: '2px',
            }}
          >
            <img
              src="/Message-5.png"
              alt="mail icon"
              className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0"
              style={{objectFit: 'contain'}}
            />
            <div className="flex-1 flex flex-col items-start text-left">
              <div className="font-josefin-sans font-bold text-xl md:text-2xl mb-1 text-white">{notif.header}</div>
              <div className="font-josefin-sans text-base md:text-lg text-white/90 leading-snug">{notif.description}</div>
            </div>
          </div>
        ))}
      </div>
      {(!showDescription) && (
        <Button variant="yellow" className="w-full mt-2 bg-[#fec8884d] hover:bg-[#fee4b74d] text-black/90 font-bold shadow-md backdrop-blur-xl border border-white/20" onClick={() => router.push("/notification")}>See more</Button>
      )}
    </div>
  );
};

export default Notification; 