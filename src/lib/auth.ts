import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "User",
      },
      fillDetails: {
        type: "boolean",
        required: false,
        defaultValue: false,
      },
      gender: {
        type: "string",
        required: false,
      },
      NPM: {
        type: "string",
        required: false,
      },
      idLine: {
        type: "string",
        required: false,
      },
      idDiscord: {
        type: "string",
        required: false,
      },
      buktiMasuk: {
        type: "string",
        required: false,
      },
      buktiShare: {
        type: "string",
        required: false,
      },
      jalurMasuk: {
        type: "string",
        required: false,
      },
      jurusan: {
        type: "string",
        required: false,
      },
      asalSekolah: {
        type: "string",
        required: false,
      },
    },
  },
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
});

export type Session = typeof auth.$Infer.Session;
