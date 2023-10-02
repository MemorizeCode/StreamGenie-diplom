import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService,PrismaService,JwtService],
  exports:[PrismaService]

})
export class MessagesModule {}
