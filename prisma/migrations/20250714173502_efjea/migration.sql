/*
  Warnings:

  - The values [Lab,Quiz] on the enum `TipeTugas` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TipeTugas_new" AS ENUM ('LAB', 'TP', 'MINIQUIZ');
ALTER TABLE "Tugas" ALTER COLUMN "tipe" TYPE "TipeTugas_new" USING ("tipe"::text::"TipeTugas_new");
ALTER TYPE "TipeTugas" RENAME TO "TipeTugas_old";
ALTER TYPE "TipeTugas_new" RENAME TO "TipeTugas";
DROP TYPE "TipeTugas_old";
COMMIT;

-- CreateTable
CREATE TABLE "allowed_email" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "allowed_email_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "allowed_email_email_key" ON "allowed_email"("email");
