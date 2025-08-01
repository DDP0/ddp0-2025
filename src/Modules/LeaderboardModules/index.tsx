import { LeaderboardResponse } from "@/app/leaderboard/page";
import Background from "../RegistModules/Background";
import { EmptyStateToDo } from "../DashboardModules/components/empty-state-todo";
import Image from "next/image";

const LeaderboardModule = ({
  leaderboardData,
  lastUpdated,
}: {
  leaderboardData: LeaderboardResponse[];
  lastUpdated?: string;
}) => {
  // Default fallback ke array kosong agar aman saat undefined/null
  const data = leaderboardData || [];

  // Jika tidak ada data
  if (!data || data.length === 0) {
    return (
      <main className="h-screen w-full relative flex justify-center items-center">
        <EmptyStateToDo message="No leaderboard data available" />
        <Background />
      </main>
    );
  }

  // Ambil top 3 dengan aman
  const top1 = data[0];
  const top2 = data[1];
  const top3 = data[2];

  return (
    <main className="min-h-screen w-full relative flex flex-col gap-6 py-32 max-md:py-28 px-20 max-lg:px-14 max-md:px-10 max-sm:px-5 font-josefin-sans overflow-hidden">
      {/* top 3 */}
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-h3 max-md:text-h3-mobile">Mentee Leaderboard</h1>
          <p>
            Last updated:{" "}
            {lastUpdated
              ? new Date(lastUpdated).toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                })
              : "-"}
          </p>
        </div>

        <div className="w-full h-110 max-lg:h-100 grid grid-cols-3 gap-10 max-lg:gap-8 max-md:gap-4 max-sm:gap-2 relative">
          {/* SECOND PLACE */}
          <div className="w-full h-full flex flex-col-reverse gap-3 hover:opacity-80 transition-opacity duration-300 group">
            <div className="h-[50%] w-full bg-gradient-podium rounded-t-3xl border-t border-x border-[#ffffff59] flex flex-col items-center py-6 max-md:py-3 justify-between">
              <div
                style={{
                  background:
                    "linear-gradient(35deg, rgba(255, 255, 255, 0.00) 33.61%, #FFF 89.19%), rgba(255, 255, 255, 0.08)",
                }}
                className="rounded-full w-12 h-12 max-md:w-10 max-md:h-10 overflow-hidden p-[1px] group-hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  style={{ background: "rgba(178, 178, 178, 0.50)" }}
                  className="w-full h-full rounded-full flex items-center justify-center text-h4 max-md:text-h4-mobile"
                >
                  2
                </div>
              </div>
              <div className="bg-gradient-kiwi p-[1px] rounded-3xl">
                <div className="bg-card glass rounded-3xl px-3 py-1">
                  <span className="font-josefin-sans text-transparent bg-gradient-kiwi bg-clip-text text-h5 max-md:text-h5-mobile leading-tight">
                    {top2?.totalScore || 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-h5-mobile max-md:text-bodyLarge-mobile">
                {top2?.user?.name
                  ? top2.user.name.length > 15
                    ? top2.user.name.split(" ").slice(0, 2).join(" ")
                    : top2.user.name
                  : "-"}
              </p>
              <p className="text-bodyLarge-mobile max-md:text-footnote-mobile">
                {top2?.user?.kelompok || "-"}
              </p>
            </div>
            <div className="relative aspect-square w-24 max-lg:w-18 max-md:w-14 rounded-full bg-gradient-kiwi self-center overflow-hidden">
              <Image
                src={top2?.user?.profilePicture || "/avatar.png"}
                alt={top2?.user?.name || "User Profile"}
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>

          {/* FIRST PLACE */}
          <div className="w-full h-full flex flex-col-reverse gap-3 hover:opacity-80 transition-opacity duration-300 group">
            <div className="h-[60%] w-full bg-gradient-podium rounded-t-3xl border-t border-x border-[#ffffff59] flex flex-col items-center py-6 max-md:py-3 justify-between">
              <div
                style={{
                  background:
                    "linear-gradient(35deg, rgba(255, 255, 255, 0.00) 33.61%, #FFF 89.19%), rgba(255, 255, 255, 0.08)",
                }}
                className="rounded-full w-12 h-12 max-md:w-10 max-md:h-10 overflow-hidden p-[1px] group-hover:-translate-y-2 transition-all duration-300"
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
                    {top1?.totalScore || 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-h5-mobile max-md:text-bodyLarge-mobile">
                {top1?.user?.name
                  ? top1.user.name.length > 15
                    ? top1.user.name.split(" ").slice(0, 2).join(" ")
                    : top1.user.name
                  : "-"}
              </p>
              <p className="text-bodyLarge-mobile max-md:text-footnote-mobile">
                {top1?.user?.kelompok || "-"}
              </p>
            </div>
            <div className="relative aspect-square w-24 max-lg:w-18 max-md:w-14 rounded-full bg-gradient-kiwi self-center overflow-hidden">
              <Image
                src={top1?.user?.profilePicture || "/avatar.png"}
                alt={top1?.user?.name || "User Profile"}
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>

          {/* THIRD PLACE */}
          <div className="w-full h-full flex flex-col-reverse gap-3 hover:opacity-80 transition-opacity duration-300 group">
            <div className="h-[40%] w-full bg-gradient-podium rounded-t-3xl border-t border-x border-[#ffffff59] flex flex-col items-center py-6 max-md:py-3 justify-between">
              <div
                style={{
                  background:
                    "linear-gradient(35deg, rgba(255, 255, 255, 0.00) 33.61%, #FFF 89.19%), rgba(255, 255, 255, 0.08)",
                }}
                className="rounded-full w-12 h-12 max-md:w-10 max-md:h-10 overflow-hidden p-[1px] group-hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  style={{ background: "rgba(218, 158, 99, 0.50)" }}
                  className="w-full h-full rounded-full flex items-center justify-center text-h4 max-md:text-h4-mobile"
                >
                  3
                </div>
              </div>
              <div className="bg-gradient-kiwi p-[1px] rounded-3xl">
                <div className="bg-card glass rounded-3xl px-3 py-1">
                  <span className="font-josefin-sans text-transparent bg-gradient-kiwi bg-clip-text text-h5 max-md:text-h5-mobile leading-tight">
                    {top3?.totalScore || 0}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-h5-mobile max-md:text-bodyLarge-mobile">
                {top3?.user?.name
                  ? top3.user.name.length > 15
                    ? top3.user.name.split(" ").slice(0, 2).join(" ")
                    : top3.user.name
                  : "-"}
              </p>
              <p className="text-bodyLarge-mobile max-md:text-footnote-mobile">
                {top3?.user?.kelompok || "-"}
              </p>
            </div>
            <div className="relative aspect-square w-24 max-lg:w-18 max-md:w-14 rounded-full bg-gradient-kiwi self-center overflow-hidden">
              <Image
                src={top3?.user?.profilePicture || "/avatar.png"}
                alt={top3?.user?.name || "User Profile"}
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>

          {/* blur */}
          <div className="absolute bottom-0 -translate-x-[5%] self-center w-[110%] h-15 max-sm:h-10 translate-y-1/2 rounded-full bg-gradient-retro-wave-pressed opacity-70 blur-[35px]" />
        </div>
      </div>
      {/* end top 3 */}

      {/* rest of leaderboard */}
      {data.length > 3 && (
        <div className="w-full flex flex-col gap-3 max-md:gap-2 p-6 max-md:p-3 rounded-3xl glass border border-[#ffffff59]">
          {data.slice(3).map((item, index) => (
            <div
              key={index}
              className="w-full flex gap-3 max-lg:gap-2 max-md:gap-1"
            >
              <div className="rounded-xl glass bg-card/10 flex justify-center items-center w-12 h-12 max-md:w-12 max-md:h-8 border border-[#ffffff59]">
                <span className="leading-tight text-h4 max-md:text-headline-mobile">
                  {index + 4}
                </span>
              </div>
              <div className="rounded-xl flex px-3 items-center w-full glass bg-card/10 h-12 max-md:h-8 border border-[#ffffff59]">
                <span className="leading-tight text-bodyLarge max-md:text-body-mobile">
                  {item?.user?.name
                    ? item.user.name.length > 15
                      ? item.user.name.split(" ").slice(0, 2).join(" ")
                      : item.user.name
                    : "-"}
                </span>
              </div>
              <div className="rounded-xl glass bg-card/10 flex justify-center items-center w-40 px-3 h-12 max-md:w-20 max-md:h-8 border border-[#ffffff59]">
                <span className="leading-tight max-md:hidden text-bodyLarge max-md:text-body-mobile">
                  {item?.user?.kelompok || "-"}
                </span>
                <span className="leading-tight hidden max-md:flex text-bodyLarge max-md:text-body-mobile">
                  {item?.user?.kelompok?.replace("Kelompok ", "") || "-"}
                </span>
              </div>
              <div className="bg-gradient-kiwi p-[1px] w-20 max-md:w-18 h-12 max-md:h-8 rounded-xl">
                <div className="bg-card w-full h-full flex justify-center items-center glass rounded-xl px-3 py-1">
                  <span className="font-josefin-sans text-transparent bg-gradient-kiwi bg-clip-text text-h5 max-md:text-h5-mobile leading-tight">
                    {item?.totalScore || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Background />
    </main>
  );
};
export default LeaderboardModule;
