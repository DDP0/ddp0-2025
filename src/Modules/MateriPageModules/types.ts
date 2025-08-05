import type { Tugas, Submisi } from "@prisma/client";

export type TaskStatus = "Graded" | "Submitted" | "Not Submitted" | "On Going";

export type TaskWithStatus = Tugas & {
  status: TaskStatus;
  submission?: Partial<Submisi> | null;
};

export type WeekWithTasks = {
  week: number;
  tasks: TaskWithStatus[];
};
