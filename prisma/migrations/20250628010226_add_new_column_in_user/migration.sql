-- CreateEnum
CREATE TYPE "JalurMasuk" AS ENUM ('SNBP', 'SNBT', 'PPKB', 'SimakUI', 'SimakKKI', 'TalentScouting', 'Prestasi');

-- CreateEnum
CREATE TYPE "Jurusan" AS ENUM ('IlmuKomputer', 'SistemInformasi', 'KKI');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('LakiLaki', 'Perempuan');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin', 'Mentor');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "NPM" TEXT,
ADD COLUMN     "asalSekolah" TEXT,
ADD COLUMN     "buktiMasuk" TEXT,
ADD COLUMN     "buktiShare" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "idDiscord" TEXT,
ADD COLUMN     "idLine" TEXT,
ADD COLUMN     "jalurMasuk" "JalurMasuk",
ADD COLUMN     "jurusan" "Jurusan",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'User';
