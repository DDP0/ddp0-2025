import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const notifications = await prisma.notification.findMany({
      select: {
        title: true,
        content: true,
        link: true,
        createdAt: true,
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.error("GET /api/notifications error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
