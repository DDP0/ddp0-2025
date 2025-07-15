-- CreateTable
CREATE TABLE "notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "link" TEXT,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);
