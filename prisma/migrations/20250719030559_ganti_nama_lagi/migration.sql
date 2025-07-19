/*
  Warnings:

  - You are about to drop the `mentor_email` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "mentor_email";

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
