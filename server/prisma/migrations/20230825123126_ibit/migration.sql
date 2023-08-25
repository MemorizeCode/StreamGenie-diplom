-- CreateTable
CREATE TABLE `Bans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `userBanId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bans` ADD CONSTRAINT `Bans_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bans` ADD CONSTRAINT `Bans_userBanId_fkey` FOREIGN KEY (`userBanId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
