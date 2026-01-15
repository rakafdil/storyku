/*
  Warnings:

  - Changed the type of `category` on the `Story` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Story` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CATEGORY" AS ENUM ('FINANCIAL', 'TECHNOLOGY', 'HEALTH');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('PUBLISH', 'DRAFT');

-- AlterTable
ALTER TABLE "Story" DROP COLUMN "category",
ADD COLUMN     "category" "CATEGORY" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "STATUS" NOT NULL;
