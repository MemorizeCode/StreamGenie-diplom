import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "KEY",
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, UsersController, PostController],
  providers: [AppService, UsersService, PrismaService, PostService],
})
export class AppModule {}
