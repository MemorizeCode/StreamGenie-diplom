-- AlterTable
ALTER TABLE `Post` MODIFY `countLikes` INTEGER NOT NULL DEFAULT 0,
    MODIFY `countComent` INTEGER NOT NULL DEFAULT 0;
