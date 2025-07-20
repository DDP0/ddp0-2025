import { Tabs } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Sidebar from "@/components/elements/Sidebar";
import ProfileTabs from "./tabs/ProfileTabs";
import Background from "../RegistModules/Background";
import HomeTabs from "./tabs/HomeTabs";

const DashboardModules = () => {
  return (
    <main className="min-h-screen overflow-hidden relative flex max-lg:flex-col">
      <Tabs defaultValue="tab1">
        <div className="w-screen py-36 px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-[1fr_4fr] max-lg:grid-cols-1 gap-6 w-full">
            <Sidebar />

            <TabsContent value="tab1">
              <HomeTabs />
            </TabsContent>
            <TabsContent className="w-full" value="tab2">
              <ProfileTabs />
            </TabsContent>
            <TabsContent value="tab3">This is Notification</TabsContent>
          </div>
        </div>
      </Tabs>
      <Background />
    </main>
    // <Loader/>
  );
};
export default DashboardModules;
