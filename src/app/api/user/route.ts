import { NextRequest, NextResponse } from "next/server";
import { registFillDetailsSchema } from "../../../model/user.schema";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
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

    // Parse and validate the request body
    const body = await request.json();
    const validation = registFillDetailsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Check if user already has registration details
    const existingUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user with registration details
    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
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

    return NextResponse.json(
      {
        message: "User registration completed successfully",
        user: {
          ...updatedUser,
        },
      },
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
