import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { FilesController } from './files/files.controller';
import { FilesService } from './files/files.service';
import { VideoController } from './video/video.controller';
import { VideoService } from './video/video.service';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "KEY",
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, UsersController, PostController, FilesController, VideoController],
  providers: [AppService, UsersService, PrismaService, PostService, FilesService, VideoService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"/api/post/setlike", method:RequestMethod.ALL}
    )
  }
}

