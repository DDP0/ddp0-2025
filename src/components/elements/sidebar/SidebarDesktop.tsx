"use client";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/hooks/useSession";
import Image from "next/image";

type Props = {
  totalNilai?: number | null;
};

export default function SidebarDesktop({ totalNilai }: Props) {
  const { user } = useSession();

  return (
    <div className="w-full min-h-[70vh] animate-fade-in">
      <div className="w-full h-fit rounded-xl glass shadow-xl border-[#ffffff59] border-1">
        <div className="flex flex-col p-4 gap-4 items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <div className="relative w-25 h-25 rounded-full translate-y-2 -z-10 overflow-hidden">
              <Image
                src={user?.image || "/avatar.png"}
                alt="Profile Picture"
                fill
                className="object-contain"
              />
            </div>
            <div className="bg-gradient-kiwi p-[1px] rounded-lg">
              <div className="bg-card glass rounded-lg px-2">
                <span className="font-josefin-sans text-transparent bg-gradient-kiwi bg-clip-text text-caption leading-0">
                  {totalNilai ?? 0}
                </span>
              </div>
            </div>
          </div>
          <h1 className="font-josefin-sans flex flex-wrap">{user?.name}</h1>
          <TabsList className="flex flex-col gap-4">
            <TabsTrigger value="tab1">
              <div className="flex justify-between w-full gap-2">
                <span className="leading-tight">Home</span>
                <Image src="/Home.svg" alt="Home" width={24} height={24} />
              </div>
            </TabsTrigger>
            <TabsTrigger value="tab2">
              <div className="flex justify-between w-full gap-2">
                <span className="leading-tight">Profile</span>
                <Image src="/User.svg" alt="Profile" width={24} height={24} />
              </div>
            </TabsTrigger>
            <TabsTrigger value="tab3">
              <div className="flex justify-between w-full gap-2">
                <span className="leading-tight">Notification</span>

                <div className="relative w-6 h-6">
                  <Image
                    src="/Notification - 2.svg"
                    alt="Notification"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
    </div>
  );
}
