/*
  Warnings:

  - You are about to drop the column `onlineLast` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `premiumAction` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `onlineLast`,
    DROP COLUMN `premiumAction`,
    ADD COLUMN `channelName` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `title` VARCHAR(191) NULL,
    `srcFiles` VARCHAR(191) NULL,
    `dataFile` VARCHAR(191) NULL,
    `sizeFile` VARCHAR(191) NULL,
    `typeFile` VARCHAR(191) NULL,

    UNIQUE INDEX `Files_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Files` ADD CONSTRAINT `Files_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
