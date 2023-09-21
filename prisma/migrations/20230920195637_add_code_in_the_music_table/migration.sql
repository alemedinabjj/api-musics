/*
  Warnings:

  - Added the required column `code` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Music" ADD COLUMN     "code" INTEGER NOT NULL;
