import { Tabs } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Sidebar from "./components/Sidebar";
import ProfileTabs from "./tabs/ProfileTabs";
import Background from "../RegistModules/Background";

const DashboardModules = () => {
  return (
    <main className="min-h-screen flex max-lg:flex-col justify-center items-center">
      <Tabs defaultValue="tab1">
        <div className="w-screen py-32 px-5 md:px-10 lg:px-20">
          <div className="flex max-lg:flex-col gap-6 w-full">
            <Sidebar />

            <TabsContent value="tab1">This is Home</TabsContent>
            <TabsContent value="tab2">
              <ProfileTabs />
            </TabsContent>
            <TabsContent value="tab3">This is Notification</TabsContent>
          </div>
        </div>
      </Tabs>
      <Background />
    </main>
  );
};
export default DashboardModules;
