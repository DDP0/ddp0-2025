import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the authenticated user session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - User not authenticated" },
        { status: 401 }
      );
    }

    const totalScore = await prisma.submisi.aggregate({
      where: {
        userId: session.user.id,
        nilai: {
          not: null,
        },
      },
      _sum: {
        nilai: true,
      },
    });

    return NextResponse.json(
      {
        message: "User points retrieved successfully",
        points: totalScore._sum.nilai ?? 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Data error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
