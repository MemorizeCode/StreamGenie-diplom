/*
  Warnings:

  - You are about to drop the column `createPost` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `Post` table. All the data in the column will be lost.
  - You are about to alter the column `countLikes` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to alter the column `countComent` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.
  - You are about to drop the column `countComent` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `countLikes` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `countSubcribe` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `countYouSubcribe` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `creatAcc` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `online` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `onlineTime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `uniqueId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropIndex
DROP INDEX `User_uniqueId_key` ON `User`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `createPost`,
    DROP COLUMN `img`,
    ADD COLUMN `imgAvatar` VARCHAR(191) NULL,
    MODIFY `countLikes` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `countComent` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `countComent`,
    DROP COLUMN `countLikes`,
    DROP COLUMN `countSubcribe`,
    DROP COLUMN `countYouSubcribe`,
    DROP COLUMN `creatAcc`,
    DROP COLUMN `online`,
    DROP COLUMN `onlineTime`,
    DROP COLUMN `uniqueId`,
    ADD COLUMN `bans` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `browser` VARCHAR(191) NULL,
    ADD COLUMN `city` VARCHAR(191) NULL,
    ADD COLUMN `countMySubs` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `countSubs` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `countWatch` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `delete` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `ipAdr` VARCHAR(191) NULL,
    ADD COLUMN `isOnline` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `onlineLast` VARCHAR(191) NULL,
    ADD COLUMN `premiumAction` VARCHAR(191) NULL,
    ADD COLUMN `role` ENUM('USER', 'ADMIN', 'MODERATOR') NOT NULL DEFAULT 'USER',
    ADD COLUMN `uniqLogin` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Profile`;

-- CreateTable
CREATE TABLE `Subcribe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `subId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subcribe` ADD CONSTRAINT `Subcribe_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcribe` ADD CONSTRAINT `Subcribe_subId_fkey` FOREIGN KEY (`subId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
