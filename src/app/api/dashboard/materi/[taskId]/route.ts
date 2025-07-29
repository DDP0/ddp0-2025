import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET: Fetch task info and current user's submission
export async function GET(
  request: NextRequest,
  context: { params: { taskId: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - User not authenticated" },
        { status: 401 }
      );
    }
    const { taskId } = context.params;
    const tugas = await prisma.tugas.findUnique({
      where: { id: taskId },
      include: {
        submissions: {
          where: { userId: session.user.id },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });
    if (!tugas)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });

    // Only return one submission
    const submission = tugas.submissions[0] ?? null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { submissions: _, ...tugasData } = tugas;

    return NextResponse.json({
      tugas: tugasData,
      submission,
    });
  } catch {
    return NextResponse.json({ error: "Failed to load task" }, { status: 500 });
  }
}

// POST: Submit/Update user's submission (upload a link, only one submission per user per task)
export async function POST(
  request: NextRequest,
  context: { params: { taskId: string } }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - User not authenticated" },
        { status: 401 }
      );
    }
    const userId = session.user.id;
    const { taskId } = context.params;
    const { link } = await request.json();

    // Upsert submission (user can only have one submission per task)
    const sub = await prisma.submisi.upsert({
      where: {
        userId_tugasId: {
          userId,
          tugasId: taskId,
        },
      },
      update: {
        link,
      },
      create: {
        userId,
        tugasId: taskId,
        link,
      },
    });

    return NextResponse.json({ submission: sub });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
