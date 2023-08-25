/*
  Warnings:

  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ComentPost` DROP FOREIGN KEY `ComentPost_postId_fkey`;

-- DropForeignKey
ALTER TABLE `ComentPost` DROP FOREIGN KEY `ComentPost_userId_fkey`;

-- DropForeignKey
ALTER TABLE `ComentVideo` DROP FOREIGN KEY `ComentVideo_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Files` DROP FOREIGN KEY `Files_userId_fkey`;

-- DropForeignKey
ALTER TABLE `LikePost` DROP FOREIGN KEY `LikePost_postId_fkey`;

-- DropForeignKey
ALTER TABLE `LikePost` DROP FOREIGN KEY `LikePost_userId_fkey`;

-- DropForeignKey
ALTER TABLE `LikeVideo` DROP FOREIGN KEY `LikeVideo_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Posts` DROP FOREIGN KEY `Posts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Subcribe` DROP FOREIGN KEY `Subcribe_subId_fkey`;

-- DropForeignKey
ALTER TABLE `Subcribe` DROP FOREIGN KEY `Subcribe_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Video` DROP FOREIGN KEY `Video_userId_fkey`;

-- DropTable
DROP TABLE `Posts`;

-- DropTable
DROP TABLE `Users`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `uniqLogin` VARCHAR(191) NULL,
    `channelName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `ipAdr` VARCHAR(191) NULL,
    `country` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `browser` VARCHAR(191) NULL,
    `role` ENUM('USER', 'ADMIN', 'MODERATOR') NOT NULL DEFAULT 'USER',
    `countPost` INTEGER NOT NULL DEFAULT 0,
    `countVideo` INTEGER NOT NULL DEFAULT 0,
    `countWatch` INTEGER NOT NULL DEFAULT 0,
    `countSubs` INTEGER NOT NULL DEFAULT 0,
    `countMySubs` INTEGER NOT NULL DEFAULT 0,
    `isOnline` BOOLEAN NOT NULL DEFAULT false,
    `premium` BOOLEAN NOT NULL DEFAULT false,
    `delete` BOOLEAN NOT NULL DEFAULT false,
    `bans` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `text` VARCHAR(191) NULL,
    `countLikes` INTEGER NOT NULL DEFAULT 0,
    `countComent` INTEGER NOT NULL DEFAULT 0,
    `countWatch` INTEGER NOT NULL DEFAULT 0,
    `imgAvatar` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,
    `delete` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subcribe` ADD CONSTRAINT `Subcribe_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subcribe` ADD CONSTRAINT `Subcribe_subId_fkey` FOREIGN KEY (`subId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikePost` ADD CONSTRAINT `LikePost_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikePost` ADD CONSTRAINT `LikePost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComentPost` ADD CONSTRAINT `ComentPost_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComentPost` ADD CONSTRAINT `ComentPost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeVideo` ADD CONSTRAINT `LikeVideo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ComentVideo` ADD CONSTRAINT `ComentVideo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Files` ADD CONSTRAINT `Files_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
