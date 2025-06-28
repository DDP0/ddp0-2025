// app/api/auth/session-extended/route.ts
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  console.log("🚀 Custom session route called!");

  if (!session) {
    return NextResponse.json({ data: null }, { status: 401 });
  }

  // Ambil user lengkap dari Prisma dengan semua field tambahan
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
      user, // user lengkap dengan semua field tambahan
      session,
    },
  });
}
