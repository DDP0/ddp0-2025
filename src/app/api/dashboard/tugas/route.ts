import { NextResponse, NextRequest } from "next/server";
import { prisma }               from "@/lib/prisma";
import { auth }                 from "@/lib/auth";

// Anda bisa mendefinisikan type ini jika ingin stricter:
type TodoStatus = "submitted" | "not_submitted" | "on_going";

export async function GET(request: NextRequest) {
  try {
    // 1. Autentikasi
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - User not authenticated" },
        { status: 401 }
      );
    }

    const tugasList = await prisma.tugas.findMany({
      include: {
        submissions: {
          where: { userId: session.user.id },
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            id: true,
            nilai: true,
            link: true,
            feedback: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
      orderBy: {
        deadline: "desc",
      },
    });

    const now = new Date();

    const tugasWithStatus = tugasList.map((tugas) => {
      const submission = tugas.submissions[0] ?? null;
      let status: TodoStatus;

      if (submission) {
        status = "submitted";
      } else if (now > tugas.deadline) {
        status = "not_submitted";
      } else {
        status = "on_going";
      }

      return {
        id:               tugas.id,
        title:            tugas.title,
        description:      tugas.description,
        linkTugas:        tugas.linkTugas,
        submissionStatus: status,
        submission,
      };
    });

    return NextResponse.json({ tugas: tugasWithStatus });
  } catch (error) {
    console.error("Error fetching tugas data:", error);
    return NextResponse.json(
      { error: "Failed to load data" },
      { status: 500 }
    );
  }
}
