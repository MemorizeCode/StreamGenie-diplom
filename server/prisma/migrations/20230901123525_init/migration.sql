/*
  Warnings:

  - You are about to drop the column `userBanId` on the `Bans` table. All the data in the column will be lost.
  - You are about to drop the column `browser` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ipAdr` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `isOnline` on the `User` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(4))`.
  - You are about to alter the column `premium` on the `User` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(4))`.
  - You are about to alter the column `delete` on the `User` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(4))`.
  - You are about to alter the column `bans` on the `User` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(4))`.
  - Added the required column `banUserId` to the `Bans` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Bans` DROP FOREIGN KEY `Bans_userBanId_fkey`;

-- AlterTable
ALTER TABLE `Bans` DROP COLUMN `userBanId`,
    ADD COLUMN `banUserId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `browser`,
    DROP COLUMN `city`,
    DROP COLUMN `country`,
    DROP COLUMN `email`,
    DROP COLUMN `ipAdr`,
    MODIFY `isOnline` ENUM('TRUE', 'FALSE') NOT NULL DEFAULT 'FALSE',
    MODIFY `premium` ENUM('TRUE', 'FALSE') NOT NULL DEFAULT 'FALSE',
    MODIFY `delete` ENUM('TRUE', 'FALSE') NOT NULL DEFAULT 'FALSE',
    MODIFY `bans` ENUM('TRUE', 'FALSE') NOT NULL DEFAULT 'FALSE';

-- AddForeignKey
ALTER TABLE `Bans` ADD CONSTRAINT `Bans_banUserId_fkey` FOREIGN KEY (`banUserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
