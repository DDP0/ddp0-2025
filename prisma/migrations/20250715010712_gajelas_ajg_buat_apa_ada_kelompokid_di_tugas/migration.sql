/*
  Warnings:

  - You are about to drop the column `kelompokId` on the `Tugas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tugas" DROP CONSTRAINT "Tugas_kelompokId_fkey";

-- AlterTable
ALTER TABLE "Tugas" DROP COLUMN "kelompokId";
