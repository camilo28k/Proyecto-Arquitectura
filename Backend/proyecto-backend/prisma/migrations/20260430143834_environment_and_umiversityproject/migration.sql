/*
  Warnings:

  - You are about to drop the column `image` on the `Art` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Entrepreneurship` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Health` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Technology` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Art" DROP COLUMN "image",
ALTER COLUMN "raised" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "raised" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Entrepreneurship" DROP COLUMN "image",
ALTER COLUMN "raised" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Health" DROP COLUMN "image",
ALTER COLUMN "raised" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Technology" DROP COLUMN "image",
ALTER COLUMN "raised" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Environment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goal" DOUBLE PRECISION NOT NULL,
    "raised" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Environment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversityProject" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goal" DOUBLE PRECISION NOT NULL,
    "raised" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UniversityProject_pkey" PRIMARY KEY ("id")
);
