import LeaderboardModule from "@/Modules/LeaderboardModules";

export interface userLeaderboard {
  name: string;
  profilePicture: string | null;
  kelompok: string;
}
export interface LeaderboardResponse {
  user: userLeaderboard;
  totalScore: number;
  lastUpdated: string;
}
export interface actualLeaderboardResponse {
  leaderboard: LeaderboardResponse[];
  lastUpdated: string;
}

const Page = async () => {
  try {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/leaderboard`,
      {
        next: { revalidate: 3600 }, // Revalidate every 1 hour
      }
    );

    if (!data.ok) {
      throw new Error("Failed to fetch leaderboard");
    }

    const leaderboard: actualLeaderboardResponse = await data.json();
    return (
      <LeaderboardModule
        lastUpdated={leaderboard.lastUpdated}
        leaderboardData={leaderboard.leaderboard}
      />
    );
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return <LeaderboardModule leaderboardData={[]} />;
  }
};

export default Page;
