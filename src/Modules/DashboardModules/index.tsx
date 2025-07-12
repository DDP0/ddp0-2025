import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

const DashboardModules = () => {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <Tabs defaultValue="tab1">
        <div className="w-fit rounded-lg glass shadow-xl border-[#ffffff59] border-1">
          <div className="flex flex-row p-4 gap-4 items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShvHT9P_015G_hmfucUiqW7fuw4Ht1hkEdBQ&s"
              alt="Profile Picture"
              className="w-15 h-15 rounded-full"
            />
            <h1 className="font-josefin-sans flex flex-wrap">Nama</h1>
            <div className="bg-gradient-kiwi self-start p-[1px] rounded-lg">
              <div className="bg-card glass rounded-lg px-2">
                <span className="font-josefin-sans text-transparent bg-gradient-kiwi bg-clip-text">
                  999
                </span>
              </div>
            </div>
          </div>
          <TabsList>
            <TabsTrigger value="tab1" className="">
              Home
            </TabsTrigger>
            <TabsTrigger value="tab2" className="">
              Profile
            </TabsTrigger>
            <TabsTrigger value="tab3" className=" ">
              Notification
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tab1">This is Home</TabsContent>
        <TabsContent value="tab2">This is Profile</TabsContent>
        <TabsContent value="tab3">This is Notification</TabsContent>
      </Tabs>
    </main>
  );
};
export default DashboardModules;
