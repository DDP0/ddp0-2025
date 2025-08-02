import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type TaskStatus = "Graded" | "Submitted" | "Not Submitted" | "On Going";

type Submission = {
  id: string;
  nilai: number | null;
  link: string;
  feedback: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type TugasWithStatus = {
  id: string;
  week: number;
  title: string;
  tipe: string;
  description: string;
  deadline: Date;
  linkTugas: string;
  thumbnail: string | null;
  status: TaskStatus;
  submission: Submission | null;
};

export async function GET(request: NextRequest) {
  try {
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
      where: {
        releaseDate: {
          lte: new Date(),
        },
      },
      orderBy: { week: "asc" },
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
    });

    const now = new Date();

    const tugasWithStatus: TugasWithStatus[] = tugasList.map((tugas) => {
      const submission = tugas.submissions[0] ?? null;
      let status: TaskStatus;

      if (submission) {
        status = submission.nilai !== null ? "Graded" : "Submitted";
      } else if (now > tugas.deadline) {
        status = "Not Submitted";
      } else {
        status = "On Going";
      }
      return {
        id: tugas.id,
        week: tugas.week,
        title: tugas.title,
        tipe: tugas.tipe,
        description: tugas.description,
        deadline: tugas.deadline,
        linkTugas: tugas.linkTugas,
        thumbnail: tugas.thumbnail,
        status,
        submission,
      };
    });

    const groupedByWeek: Record<number, TugasWithStatus[]> = {};
    for (const task of tugasWithStatus) {
      if (!groupedByWeek[task.week]) groupedByWeek[task.week] = [];
      groupedByWeek[task.week].push(task);
    }

    const weeks = Object.entries(groupedByWeek)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([week, tasks]) => ({
        week: Number(week),
        tasks,
      }));

    return NextResponse.json({ weeks });
  } catch {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

// HELPER kalau mau POST

// export async function POST(request: NextRequest) {
//   try {
//

//     // Parse body
//     const body = await request.json();
//     const { week, title, description, tipe, linkTugas, deadline, thumbnail } =
//       body;

//     if (
//       week == null ||
//       !title ||
//       !description ||
//       !tipe ||
//       !linkTugas ||
//       !deadline ||
//       !thumbnail
//     ) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const tugas = await prisma.tugas.create({
//       data: {
//         week,
//         title,
//         description,
//         tipe,
//         linkTugas,
//         deadline: new Date(deadline),
//         thumbnail,
//       },
//     });

//     return NextResponse.json({ tugas });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to create tugas" },
//       { status: 500 }
//     );
//   }
// }
