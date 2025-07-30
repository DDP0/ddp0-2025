import type { TaskWithStatus } from "../types";
import { useRouter } from "next/navigation";
type ModuleCardVariant = "materi" | "miniQuiz" | "lab" | "tp";
import Image from "next/image";

export function ModuleCard({
  task,
  variant,
}: {
  task: TaskWithStatus;
  variant: ModuleCardVariant;
}) {
  const statusColor = {
    Graded: "text-[#70C69A]",
    Submitted: "text-[#70C69A]",
    "Not Submitted": "text-[#FEC888]",
    "On Going": "text-gray-400",
  }[task.status];

  const cardClasses =
    "w-full rounded-xl glass shadow-xl border border-[#ffffff22] glass ring-1 ring-white/10";
  const router = useRouter();

  return (
    <div
      className={`flex items-stretch p-3 sm:p-6 min-h-[110px] sm:min-h-[140px] h-[110px] sm:h-[140px] ${cardClasses} hover:bg-opacity-80 cursor-pointer transition-all duration-200 font-josefin-sans`}
      onClick={() => router.push(`/dashboard/materi/${task.id}`)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || (e.key === " " && variant !== "materi")) {
          router.push(`/dashboard/materi/${task.id}`);
        }
      }}
    >
      {/* Thumbnail/image if exists */}
      {task.thumbnail && (
        <div className="flex-shrink-0 flex items-center">
          {/* <img
            src={task.thumbnail}
            alt={task.title}
            className="rounded-md object-cover h-full w-full"
          /> */}
          <div className="relative aspect-[213/120] h-full">
            <Image
              src={task.thumbnail}
              alt={task.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col justify-end items-start min-w-0 pl-4 ">
        <h3 className="font-semibold text-base lg:text-lg text-white mb-1 sm:mb-2 ">
          {task.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-3 leading-relaxed line-clamp-3">
          {task.description}
        </p>
        {task.deadline && (
          <div className="text-xs text-gray-400">
            Deadline:{" "}
            {new Date(task.deadline).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>

      {/* Status and Arrow */}
      <div className="flex flex-col items-end justify-between gap-2 flex-shrink-0 pl-1">
        {task.tipe !== "MATERI" && (
          <span
            className={`font-medium text-xs sm:text-sm ${statusColor} text-right`}
          >
            {task.status}
          </span>
        )}
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}
