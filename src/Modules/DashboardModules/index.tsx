import { Tabs } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Sidebar from "./components/Sidebar";

const DashboardModules = () => {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <Tabs defaultValue="tab1">
        <div className="w-full flex gap-6 px-5 lg:px-20">
          <Sidebar />

          <TabsContent value="tab1">This is Home</TabsContent>
          <TabsContent value="tab2">This is Profile</TabsContent>
          <TabsContent value="tab3">This is Notification</TabsContent>
        </div>
      </Tabs>
    </main>
  );
};
export default DashboardModules;
