import { LeaderboardResponse } from "@/app/leaderboard/page";
import Background from "../RegistModules/Background";
import { EmptyStateToDo } from "../DashboardModules/components/empty-state-todo";
import Image from "next/image";

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
  return (
    <main className="min-h-screen w-full relative flex flex-col py-32 max-md:py-28 px-20 max-lg:px-14 max-md:px-10 max-sm:px-5 font-josefin-sans">
      {/* top 3 */}
      <div className="flex flex-col gap-6">
        <h1 className="text-h3 max-md:text-h3-mobile text-center">
          Mentee Leaderboard
        </h1>
        <div className="w-full h-110 max-lg:h-100 grid grid-cols-3 gap-10 max-lg:gap-8 max-md:gap-4 max-sm:gap-2 relative">
          {/* second place */}
          <div className="w-full h-full flex flex-col-reverse gap-3">
            <div className="h-[50%] w-full bg-gradient-podium  rounded-t-3xl border-t border-x border-[#ffffff59] flex flex-col items-center py-6 max-md:py-3 justify-between">
              <div
                style={{
                  background:
                    "linear-gradient(35deg, rgba(255, 255, 255, 0.00) 33.61%, #FFF 89.19%), rgba(255, 255, 255, 0.08)",
                }}
                className="rounded-full w-12 h-12 max-md:w-10 max-md:h-10 overflow-hidden p-[1px]"
              >
                <div
                  style={{
                    background: "rgba(178, 178, 178, 0.50)",
                  }}
                  className="w-full h-full rounded-full flex items-center justify-center text-h4 max-md:text-h4-mobile"
                >
                  2
                </div>
              </div>
              <div className="bg-gradient-kiwi p-[1px] rounded-3xl">
                <div className="bg-card glass rounded-3xl px-3 py-1">
                  <span className="font-josefin-sans text-transparent bg-gradient-kiwi bg-clip-text text-h5 max-md:text-h5-mobile leading-tight">
                    {leaderboardData[1].totalScore}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-h5-mobile max-md:text-bodyLarge-mobile">
                {leaderboardData[1].user.name}
              </p>
              <p className="text-bodyLarge-mobile max-md:text-footnote-mobile">
                {leaderboardData[1].user.kelompok}
              </p>
            </div>
            <div className="relative aspect-square w-24 max-lg:w-18 max-md:w-14 rounded-full bg-gradient-kiwi self-center">
              <Image
                src={leaderboardData[1].user.profilePicture || "/avatar.png"}
                alt={leaderboardData[1].user.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
          {/* first place */}
          <div className="w-full h-full flex flex-col-reverse gap-3">
            <div className="h-[60%] w-full bg-gradient-podium  rounded-t-3xl border-t border-x border-[#ffffff59] flex flex-col items-center py-6 max-md:py-3 justify-between">
              <div
                style={{
                  background:
                    "linear-gradient(35deg, rgba(255, 255, 255, 0.00) 33.61%, #FFF 89.19%), rgba(255, 255, 255, 0.08)",
                }}
                className="rounded-full w-12 h-12 max-md:w-10 max-md:h-10 overflow-hidden p-[1px]"
              >
                <div
                  style={{
                    background:
                      "linear-gradient(100deg, rgba(254, 200, 136, 0.50) 0%, rgba(154, 231, 184, 0.50) 100%)",
                  }}
                  className="w-full h-full rounded-full flex items-center justify-center text-h4 max-md:text-h4-mobile"
                >
                  1
                </div>
              </div>
              <div className="bg-gradient-kiwi p-[1px] rounded-3xl">
                <div className="bg-card glass rounded-3xl px-3 py-1">
                  <span className="font-josefin-sans text-transparent bg-gradient-kiwi bg-clip-text text-h5 max-md:text-h5-mobile leading-tight">
                    {leaderboardData[0].totalScore}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-h5-mobile max-md:text-bodyLarge-mobile">
                {leaderboardData[0].user.name}
              </p>
              <p className="text-bodyLarge-mobile max-md:text-footnote-mobile">
                {leaderboardData[0].user.kelompok}
              </p>
            </div>
            <div className="relative aspect-square w-24 max-lg:w-18 max-md:w-14 rounded-full bg-gradient-kiwi self-center">
              <Image
                src={leaderboardData[0].user.profilePicture || "/avatar.png"}
                alt={leaderboardData[0].user.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
          {/* third place */}
          <div className="w-full h-full flex flex-col-reverse gap-3">
            <div className="h-[40%] w-full bg-gradient-podium  rounded-t-3xl border-t border-x border-[#ffffff59] flex flex-col items-center py-6 max-md:py-3 justify-between">
              <div
                style={{
                  background:
                    "linear-gradient(35deg, rgba(255, 255, 255, 0.00) 33.61%, #FFF 89.19%), rgba(255, 255, 255, 0.08)",
                }}
                className="rounded-full w-12 h-12 max-md:w-10 max-md:h-10 overflow-hidden p-[1px]"
              >
                <div
                  style={{
                    background: "rgba(218, 158, 99, 0.50)",
                  }}
                  className="w-full h-full rounded-full flex items-center justify-center text-h4 max-md:text-h4-mobile"
                >
                  3
                </div>
              </div>
              <div className="bg-gradient-kiwi p-[1px] rounded-3xl">
                <div className="bg-card glass rounded-3xl px-3 py-1">
                  <span className="font-josefin-sans text-transparent bg-gradient-kiwi bg-clip-text text-h5 max-md:text-h5-mobile leading-tight">
                    {leaderboardData[2].totalScore}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-h5-mobile max-md:text-bodyLarge-mobile">
                {leaderboardData[2].user.name}
              </p>
              <p className="text-bodyLarge-mobile max-md:text-footnote-mobile">
                {leaderboardData[2].user.kelompok}
              </p>
            </div>
            <div className="relative aspect-square w-24 max-lg:w-18 max-md:w-14 rounded-full bg-gradient-kiwi self-center">
              <Image
                src={leaderboardData[2].user.profilePicture || "/avatar.png"}
                alt={leaderboardData[2].user.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </div>
          {/* blur */}
          <div className="absolute bottom-0 -translate-x-[5%] self-center w-[110%] h-15 max-sm:h-10 translate-y-1/2 rounded-full bg-gradient-retro-wave-pressed opacity-70 blur-[35px]"></div>
        </div>
      </div>
      <Background />
    </main>
  );
};
export default LeaderboardModule;
