/*
  Warnings:

  - You are about to drop the `allowed_email` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deadline` to the `Tugas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tugas" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "allowed_email";

-- CreateTable
CREATE TABLE "mentor_email" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentor_email_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mentor_email_email_key" ON "mentor_email"("email");
