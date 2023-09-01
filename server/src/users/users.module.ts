import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports:[],
    controllers:[UsersController],
    providers:[UsersService,PrismaService],
    exports:[PrismaService]
})
export class UsersModule {}
