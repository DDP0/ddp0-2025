import { NextRequest, NextResponse } from "next/server";
import { registFillDetailsSchema } from "@/model/user.schema";
import { mentorSchema } from "@/model/mentor.schema";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { addUserToSheet } from "@/lib/googleSheets";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - User not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const params = request.nextUrl.searchParams;
    const isMentor = params.get("mentor") === "true";

    // Ambil user dari database
    const existingUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (isMentor) {
      // Validasi email mentor
      const isValidEmail = await prisma.aLLOWED_EMAIL.findFirst({
        where: { email: session.user.email },
      });

      if (!isValidEmail) {
        return NextResponse.json(
          { error: "You are not allowed to register as a mentor" },
          { status: 403 }
        );
      }

      // Validasi data mentor
      const validation = mentorSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { error: "Validation failed", details: validation.error.errors },
          { status: 400 }
        );
      }

      const validatedData = validation.data;

      const updatedUser = await prisma.user.update({
        where: { id: session.user.id },
        data: {
          role: "Mentor",
          name: validatedData.namaLengkap,
          NPM: validatedData.npm,
          idLine: validatedData.idLine,
          idDiscord: validatedData.idDiscord,
          jurusan: validatedData.jurusan,
          fillDetails: true,
        },
      });

      return NextResponse.json(
        { message: "Mentor registration successful", user: updatedUser },
        { status: 200 }
      );
    }

    // Validasi data user biasa
    const validation = registFillDetailsSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.errors },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        role: "User",
        name: validatedData.namaLengkap,
        NPM: validatedData.npm,
        idLine: validatedData.idLine,
        idDiscord: validatedData.idDiscord,
        buktiMasuk: validatedData.screenshotBuktiMasuk,
        buktiShare: validatedData.screenshotBuktiShareIG,
        jalurMasuk: validatedData.jalurMasuk,
        jurusan: validatedData.jurusan,
        gender: validatedData.gender,
        asalSekolah: validatedData.asalSekolah,
        fillDetails: true,
      },
    });
    if (process.env.NODE_ENV === "production") {
      const userdata = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        NPM: updatedUser.NPM ?? undefined,
        idLine: updatedUser.idLine ?? undefined,
        idDiscord: updatedUser.idDiscord ?? undefined,
        buktiMasuk: updatedUser.buktiMasuk ?? undefined,
        buktiShare: updatedUser.buktiShare ?? undefined,
        jalurMasuk: updatedUser.jalurMasuk ?? undefined,
        jurusan: updatedUser.jurusan ?? undefined,
        gender: updatedUser.gender ?? undefined,
        asalSekolah: updatedUser.asalSekolah ?? undefined,
        createdAt: updatedUser.createdAt,
      };
      addUserToSheet(userdata);
    }
    return NextResponse.json(
      { message: "User registration successful", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
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

    const body = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: body.namaLengkap,
        NPM: body.npm,
        idLine: body.idLine,
        idDiscord: body.idDiscord,
        buktiMasuk: body.screenshotBuktiMasuk,
        buktiShare: body.screenshotBuktiShareIG,
        jalurMasuk: body.jalurMasuk,
        jurusan: body.jurusan,
        gender: body.gender,
        asalSekolah: body.asalSekolah,
      },
    });

    return NextResponse.json(
      { message: "User profile updated", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
