import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface User {
  name: string;
  idLine?: string | null;
}

interface KelompokUser {
  user: User;
  isMentor: boolean;
}

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
    // const mentorRecords = await prisma.kelompokUser.findMany({
    //   where: { isMentor: true },
    //   include: { user: true },
    // });

    // const menteeRecords = await prisma.kelompokUser.findMany({
    //   where: { isMentor: false },
    //   include: { user: true },
    // });

    // const mentors = mentorRecords.map((mk: KelompokUser) => ({
    //   name: mk.user.name,
    //   lineId: mk.user.idLine || "",
    // }));
    // const mentees = menteeRecords.map((mk: KelompokUser) => mk.user.name);
    const kelompok = await prisma.kelompokUser.findFirst({
      where: { userId: session.user.id },
    });
    if (!kelompok) {
      return NextResponse.json(
        { error: "Kelompok not found for the user" },
        { status: 404 }
      );
    }
    const mentorRecords = await prisma.kelompokUser.findMany({
      where: { kelompokId: kelompok?.kelompokId, isMentor: true },
      include: { user: true },
    });
    const menteeRecords = await prisma.kelompokUser.findMany({
      where: { kelompokId: kelompok?.kelompokId, isMentor: false },
      include: { user: true },
    });
    
    const mentors = mentorRecords.map((mk: KelompokUser) => ({
      name: mk.user.name,
      lineId: mk.user.idLine || "",
    }));
    const mentees = menteeRecords.map((mk: KelompokUser) => mk.user.name);

    return NextResponse.json({ mentors, mentees });
  } catch (error) {
    console.error("Error fetching kelompok data:", error);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
