-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `uniqueId` VARCHAR(191) NOT NULL,
    `premium` BOOLEAN NOT NULL DEFAULT false,
    `creatAcc` VARCHAR(191) NOT NULL,
    `online` BOOLEAN NOT NULL DEFAULT false,
    `onlineTime` VARCHAR(191) NULL,
    `countSubcribe` INTEGER NOT NULL DEFAULT 0,
    `countYouSubcribe` INTEGER NOT NULL DEFAULT 0,
    `countPost` INTEGER NOT NULL DEFAULT 0,
    `countVideo` INTEGER NOT NULL DEFAULT 0,
    `countLikes` INTEGER NOT NULL DEFAULT 0,
    `countComent` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_login_key`(`login`),
    UNIQUE INDEX `User_uniqueId_key`(`uniqueId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `text` VARCHAR(191) NULL,
    `createPost` DATETIME(3) NULL,
    `img` VARCHAR(191) NULL,
    `countWatch` INTEGER NOT NULL DEFAULT 0,
    `countLikes` INTEGER NOT NULL DEFAULT 0,
    `countComent` INTEGER NOT NULL DEFAULT 0,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Post_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LikePost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,

    UNIQUE INDEX `LikePost_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ComentPost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,
    `delete` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `ComentPost_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
