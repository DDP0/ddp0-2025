"use client";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

type Props = {
  totalNilai?: number | null;
};

export default function SidebarDesktop({ totalNilai }: Props) {
  const { user } = useSession();
  const router = useRouter();

  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-fit rounded-lg glass shadow-xl border-[#ffffff59] border-1">
        <div className="flex flex-col p-4 gap-4 items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShvHT9P_015G_hmfucUiqW7fuw4Ht1hkEdBQ&s"
              alt="Profile Picture"
              className="w-25 h-25 rounded-full translate-y-2 -z-10"
            />
            <div className="bg-gradient-kiwi p-[1px] rounded-lg">
              <div className="bg-card glass rounded-lg px-2">
                <span className="font-josefin-sans text-transparent bg-gradient-kiwi bg-clip-text text-caption">
                  {totalNilai ?? 0}
                </span>
              </div>
            </div>
          </div>
          <h1 className="font-josefin-sans flex flex-wrap">{user?.name}</h1>
          <TabsList>
            <TabsTrigger value="tab1">
              <div className="flex justify-between w-full gap-2">
                <span>Home</span>
                <img src="/Home.svg" alt="Home" className="w-6 h-6" />
              </div>
            </TabsTrigger>
            <TabsTrigger value="tab2">
              <div className="flex justify-between w-full gap-2">
                <span>Profile</span>
                <img src="/User.svg" alt="Profile" className="w-6 h-6" />
              </div>
            </TabsTrigger>
            <TabsTrigger value="tab3">
              <div className="flex justify-between w-full gap-2">
                <span>Notification</span>
                <img
                  src="/Notification - 2.svg"
                  alt="Notification"
                  className="w-6 h-6"
                />
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
    </div>
  );
}
