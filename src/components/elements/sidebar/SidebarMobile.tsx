"use client";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/hooks/useSession";
import Image from "next/image";

type Props = {
  totalNilai?: number | null;
};

export default function SidebarMobile({ totalNilai }: Props) {
  const { user } = useSession();

  return (
    <div className="w-full h-fit rounded-lg glass shadow-xl border-[#ffffff59] border-1 animate-fade-in">
      <div className="flex flex-row p-4 gap-4 justify-between items-center">
        <div className="relative w-15 h-15 rounded-full overflow-hidden">
          <Image
            src={user?.image || "/avatar.png"}
            alt="Profile Picture"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="font-josefin-sans flex flex-wrap">{user?.name}</h1>
        <div className="bg-gradient-kiwi self-start p-[1px] rounded-lg">
          <div className="bg-card glass rounded-lg px-2">
            <span className="font-josefin-sans text-transparent bg-gradient-kiwi bg-clip-text text-caption-mobile">
              {totalNilai ?? 0}
            </span>
          </div>
        </div>
      </div>
      <TabsList>
        <TabsTrigger value="tab1">Home</TabsTrigger>
        <TabsTrigger value="tab2">Profile</TabsTrigger>
        <TabsTrigger value="tab3">Notification</TabsTrigger>
      </TabsList>
    </div>
  );
}
