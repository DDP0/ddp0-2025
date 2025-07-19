import { NextRequest, NextResponse } from "next/server";
import { NotificationItem } from "@/Modules/DashboardModules/notifications";

const notifications: NotificationItem[] = [
  {
    id: "1",
    header: "Lab 3 rilis",
    description: "Lab 3 sudah dapat diakses di LMS.",
    color: 'purple',
  },
  {
    id: "2",
    header: "Revisi Lab 2",
    description: "Revisi Lab 2 sudah dapat diakses di LMS.",
    color: 'yellow',
  },
  {
    id: "3",
    header: "Lab 2 rilis",
    description: "Lab 2 sudah dapat diakses di LMS.",
    color: 'purple',
  },
  {
    id: "4",
    header: "Lab 1 rilis",
    description: "Lab 1 sudah dapat diakses di LMS.",
    color: 'green',
  },
];

export async function GET(request: NextRequest) {
  return NextResponse.json({ notifications });
} 