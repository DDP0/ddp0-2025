import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get top 10 users with highest average scores from graded submissions
    const topUsers = await prisma.user.findMany({
      where: {
        role: "User",
        submissions: {
          some: {
            nilai: {
              not: null,
            },
          },
        },
      },
      include: {
        submissions: {
          where: {
            nilai: {
              not: null,
            },
          },
          select: {
            nilai: true,
          },
        },
        kelompokUsers: {
          include: {
            kelompok: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Calculate average scores and format the data
    const leaderboard = topUsers
      .map((user) => {
        const scores = user.submissions
          .map((submission) => submission.nilai)
          .filter((nilai) => nilai !== null) as number[];

        if (scores.length === 0) return null;

        const kelompokName =
          user.kelompokUsers[0]?.kelompok?.name || "No Group";

        return {
          user: {
            name: user.name,
            profilePicture: user.image,
            kelompok: kelompokName,
          },
          totalScore: scores.reduce((sum, score) => sum + score, 0),
        };
      })
      .filter((user) => user !== null)
      .sort((a, b) => b.totalScore - a.totalScore) // Sort by totalScore in descending order (highest first)
      .slice(0, 10); // Get top 10

    return NextResponse.json({
      leaderboard: leaderboard,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
