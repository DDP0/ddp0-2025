import { Tabs } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Sidebar from "@/components/elements/Sidebar";
import ProfileTabs from "./tabs/ProfileTabs";
import Background from "../RegistModules/Background";
import NotificationTabs from "./tabs/NotificationTabs";
import HomeTabs from "./tabs/HomeTabs";
import HomeTabsMentor from "../MentorModules/tabs/HomeTabsMentor";
import Lab from "../MentorModules/tabs/Lab";
import MiniQuiz from "../MentorModules/tabs/MiniQuiz";
import TP from "../MentorModules/tabs/TP";

interface Props {
  isMentor?: boolean;
}

const DashboardModules = ({ isMentor = true }: Props) => {
  return (
    <main className="min-h-screen overflow-hidden relative flex max-lg:flex-col">
      <Tabs defaultValue="tab1">
        <div className="w-screen py-36 px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-[1fr_4fr] max-lg:grid-cols-1 gap-6 w-full">
            <Sidebar isMentor={isMentor} />

            {isMentor ? (
              <>
                <TabsContent value="tab1">
                  <HomeTabsMentor />
                </TabsContent>
                <TabsContent value="tab2">
                  <MiniQuiz />
                </TabsContent>
                <TabsContent value="tab3">
                  <Lab />
                </TabsContent>
                <TabsContent value="tab4">
                  <TP />
                </TabsContent>
              </>
            ) : (
              <>
                <TabsContent value="tab1">
                  <HomeTabs />
                </TabsContent>
                <TabsContent className="w-full" value="tab2">
                  <ProfileTabs />
                </TabsContent>
                <TabsContent value="tab3">
                  <NotificationTabs />
                </TabsContent>
              </>
            )}
          </div>
        </div>
      </Tabs>
      <Background />
    </main>
    // <Loader/>
  );
};
export default DashboardModules;
