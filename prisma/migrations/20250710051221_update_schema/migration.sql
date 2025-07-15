-- CreateEnum
CREATE TYPE "TipeTugas" AS ENUM ('Lab', 'Quiz');

-- CreateTable
CREATE TABLE "Kelompok" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kelompok_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KelompokUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kelompokId" TEXT NOT NULL,
    "isMentor" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "KelompokUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tugas" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tipe" "TipeTugas" NOT NULL,
    "linkTugas" TEXT NOT NULL,
    "kelompokId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submisi" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tugasId" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "nilai" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submisi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KelompokUser_userId_kelompokId_key" ON "KelompokUser"("userId", "kelompokId");

-- CreateIndex
CREATE UNIQUE INDEX "Submisi_userId_tugasId_key" ON "Submisi"("userId", "tugasId");

-- AddForeignKey
ALTER TABLE "KelompokUser" ADD CONSTRAINT "KelompokUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KelompokUser" ADD CONSTRAINT "KelompokUser_kelompokId_fkey" FOREIGN KEY ("kelompokId") REFERENCES "Kelompok"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tugas" ADD CONSTRAINT "Tugas_kelompokId_fkey" FOREIGN KEY ("kelompokId") REFERENCES "Kelompok"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submisi" ADD CONSTRAINT "Submisi_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submisi" ADD CONSTRAINT "Submisi_tugasId_fkey" FOREIGN KEY ("tugasId") REFERENCES "Tugas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
