import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports: [],
    controllers: [PostController],
    providers: [PostService,PrismaService],
    exports:[PrismaService]
  })
export class PostModule {}
