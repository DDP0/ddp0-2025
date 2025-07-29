/*
  Warnings:

  - You are about to drop the column `index` on the `Tugas` table. All the data in the column will be lost.
  - Added the required column `week` to the `Tugas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tugas" DROP COLUMN "index",
ADD COLUMN     "week" INTEGER NOT NULL;
