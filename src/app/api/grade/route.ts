import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { TipeTugas } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const taskType = searchParams.get("type") as TipeTugas;

    if (!taskType || !Object.values(TipeTugas).includes(taskType)) {
      return NextResponse.json(
        { error: "Invalid or missing task type. Must be LAB, TP, or MINIQUIZ" },
        { status: 400 }
      );
    }

    const kelompokUser = await prisma.kelompokUser.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!kelompokUser) {
      return NextResponse.json(
        { error: "you need to have a group first" },
        { status: 401 }
      );
    }

    if (!kelompokUser.isMentor) {
      return NextResponse.json({ error: "Not Allowed" }, { status: 401 });
    }

    const mentees = await prisma.kelompokUser.findMany({
      where: {
        kelompokId: kelompokUser.kelompokId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    console.log(mentees);

    const menteeUserIds = mentees.map((mentee) => mentee.userId);

    const tugases = await prisma.tugas.findMany({
      where: {
        tipe: taskType,
      },
      orderBy: {
        index: "asc",
      },
    });

    const allSubmissions = await prisma.submisi.findMany({
      where: {
        userId: {
          in: menteeUserIds,
        },
        tugasId: {
          in: tugases.map((tugas) => tugas.id),
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        tugas: {
          select: {
            index: true,
            title: true,
          },
        },
      },
    });

    const submissions = tugases.map((tugas) => {
      const grades = mentees
        .filter((mentee) => !mentee.isMentor)
        .map((mentee) => {
          const submission = allSubmissions.find(
            (sub) => sub.userId === mentee.userId && sub.tugasId === tugas.id
          );

          return {
            menteeName: mentee.user.name || "Unknown User",
            submittedOn: submission
              ? new Date(submission.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "",
            submissionUrl: submission?.link || "",
            grade: submission?.nilai ? submission.nilai.toString() : "",
            feedback: submission?.feedback || "",
            submissionId: submission?.id || null,
          };
        });

      return {
        id: tugas.index,
        title: tugas.title,
        grades: grades,
      };
    });

    console.log(submissions);

    return NextResponse.json(submissions, { status: 200 });
  } catch (error) {
    console.error("GET /api/grade error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const kelompokUser = await prisma.kelompokUser.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (!kelompokUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    if (!kelompokUser.isMentor) {
      return NextResponse.json({ error: "Not Allowed" }, { status: 401 });
    }

    const body = await request.json();
    const { submissionId, grade, feedback } = body;

    if (!submissionId) {
      return NextResponse.json(
        { error: "Submission ID is required" },
        { status: 400 }
      );
    }

    if (grade !== null && grade !== undefined) {
      const gradeNum = parseInt(grade);
      if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 105) {
        return NextResponse.json(
          { error: "Grade must be between 0 and 105" },
          { status: 400 }
        );
      }
    }

    const submission = await prisma.submisi.findUnique({
      where: {
        id: submissionId,
      },
      include: {
        user: {
          include: {
            kelompokUsers: {
              where: {
                kelompokId: kelompokUser.kelompokId,
              },
            },
          },
        },
      },
    });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    if (submission.user.kelompokUsers.length === 0) {
      return NextResponse.json(
        { error: "You can only grade submissions from your mentees" },
        { status: 403 }
      );
    }

    const updatedSubmission = await prisma.submisi.update({
      where: {
        id: submissionId,
      },
      data: {
        nilai: grade !== null && grade !== undefined ? parseInt(grade) : null,
        feedback: feedback || null,
        gradedBy: session.user.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        tugas: {
          select: {
            title: true,
          },
        },
      },
    });

    console.log(
      `Grade updated for submission ${submissionId} by mentor ${session.user.id}`
    );

    return NextResponse.json(
      {
        message: "Grade updated successfully",
        submission: {
          id: updatedSubmission.id,
          studentName: updatedSubmission.user.name,
          taskTitle: updatedSubmission.tugas.title,
          grade: updatedSubmission.nilai,
          feedback: updatedSubmission.feedback,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/grade error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
