/*
  Warnings:

  - Added the required column `index` to the `Tugas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tugas" ADD COLUMN     "index" INTEGER NOT NULL;
