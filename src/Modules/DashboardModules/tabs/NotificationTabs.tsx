"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Message } from "@/components/icons/Message";
import Link from "next/link";

interface NotificationType {
  title: string;
  content: string;
  link: string | null;
  createdAt: string;
}

const NotificationTabs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/notifications");
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        const data: NotificationType[] = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[50vh] overflow-hidden relative flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in transition-all duration-300 w-full flex flex-col gap-1 sm:gap-2 md:gap-3 lg:gap-4">
      <h4 className="font-josefin-sans text-h4 max-lg:text-h4-mobile">
        Notifications
      </h4>
      {notifications.length > 0 ? (
        <div className="flex flex-col w-full gap-4">
          {notifications.map((notif, index) => (
            <Link
              key={index}
              href={notif.link || "#"}
              className="px-4 max-md:px-3 py-3 glass border border-[#ffffff59] flex items-center gap-4 max-md:gap-2 rounded-xl"
            >
              <div className="flex-shrink-0">
                <Message
                  size=""
                  className="w-20 h-20 max-md:w-12 max-md:h-12 self-center"
                />
              </div>
              <div className="flex flex-col justify-between font-josefin-sans">
                <p className="text-headline max-md:text-headline-mobile">
                  {notif.title}
                </p>
                <p className="text-base max-h-[50] overflow-y-scroll no-scrollbar">{notif.content}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-[40vh] overflow-hidden relative flex flex-col items-center justify-center">
          <div className="relative aspect-square w-52 max-lg:w-42 max-md:w-35">
            <Image
              src="/kucingdankardus.png"
              alt="No notifications"
              fill
              className="object-contain"
            />
          </div>
          <p className="font-josefin-sans text-headline max-md:text-headline-mobile">
            Tidak ada notifikasi
          </p>
        </div>
      )}
    </div>
  );
};
export default NotificationTabs;
