-- AlterTable
ALTER TABLE "Submisi" ADD COLUMN     "gradedBy" TEXT;

-- AddForeignKey
ALTER TABLE "Submisi" ADD CONSTRAINT "Submisi_gradedBy_fkey" FOREIGN KEY ("gradedBy") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
