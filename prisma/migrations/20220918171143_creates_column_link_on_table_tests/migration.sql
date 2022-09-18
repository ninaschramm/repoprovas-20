/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `tests` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `link` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "link" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tests_link_key" ON "tests"("link");
