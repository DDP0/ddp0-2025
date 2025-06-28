// app/api/auth/session/route.ts
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Import Prisma client

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return NextResponse.json({ data: null }, { status: 401 });
    }

    // Ambil user lengkap dari Prisma
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        gender: true,
        NPM: true,
        idLine: true,
        idDiscord: true,
        buktiMasuk: true,
        buktiShare: true,
        jalurMasuk: true,
        jurusan: true,
        asalSekolah: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ data: null }, { status: 404 });
    }

    return NextResponse.json({
      data: {
        user, // <--- user lengkap dengan semua field tambahan
        session,
      },
    });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ data: null }, { status: 500 });
  }
}
