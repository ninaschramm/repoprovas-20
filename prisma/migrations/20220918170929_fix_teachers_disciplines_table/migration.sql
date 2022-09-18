/*
  Warnings:

  - You are about to drop the column `DisciplineId` on the `teachersDisciplines` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `teachersDisciplines` table. All the data in the column will be lost.
  - Added the required column `disciplineId` to the `teachersDisciplines` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "teachersDisciplines" DROP CONSTRAINT "teachersDisciplines_DisciplineId_fkey";

-- DropIndex
DROP INDEX "teachersDisciplines_name_key";

-- AlterTable
ALTER TABLE "teachersDisciplines" DROP COLUMN "DisciplineId",
DROP COLUMN "name",
ADD COLUMN     "disciplineId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "teachersDisciplines" ADD CONSTRAINT "teachersDisciplines_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
