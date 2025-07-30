import { LeaderboardResponse } from "@/app/leaderboard/page";
import Background from "../RegistModules/Background";
import { EmptyStateToDo } from "../DashboardModules/components/empty-state-todo";

const LeaderboardModule = ({
  leaderboardData,
}: {
  leaderboardData: LeaderboardResponse[];
}) => {
  console.log(leaderboardData);
  if (leaderboardData.length === 0) {
    return (
      <main className="h-screen w-full relative flex justify-center items-center">
        <EmptyStateToDo message="No leaderboard data available" />
        <Background />
      </main>
    );
  }
  return <main className="h-screen w-full relative"></main>;
};
export default LeaderboardModule;
