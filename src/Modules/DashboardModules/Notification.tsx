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
          <div className="w-full flex justify-end mt-2">
            <span
              className="font-josefin-sans text-white/80 text-base cursor-pointer flex items-center gap-1 hover:underline"
              onClick={() => router.push("/notification")}
            >
              See more <span className="ml-1">&gt;</span>
            </span>
          </div>
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
            className="self-stretch px-4 py-3 bg-Card/10 rounded-xl shadow-[0px_32px_64px_0px_rgba(0,0,0,0.10)] shadow-[0px_16px_32px_0px_rgba(0,0,0,0.05)] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.05)] shadow-[inset_0px_48px_100px_0px_rgba(255,255,255,0.15)] outline outline-1 outline-offset-[-1px] outline-white/0 backdrop-blur-[10px] inline-flex justify-start items-start gap-4"
          >
            <div className="w-20 h-20 flex justify-center items-center gap-2.5">
              <div className="flex-1 self-stretch relative">
                <img
                  src="/Message-5.png"
                  alt="mail icon"
                  className="w-20 h-20 left-0 top-0 absolute overflow-hidden object-contain"
                />
              </div>
            </div>
            <div className="flex-1 py-3 inline-flex flex-col justify-start items-start gap-1">
              <div className="justify-start text-Text-White text-xl font-medium font-['Josefin_Sans']">{notif.header}</div>
              <div className="self-stretch justify-start text-variableid-15-206 text-base font-normal font-['Josefin_Sans']">{notif.description}</div>
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