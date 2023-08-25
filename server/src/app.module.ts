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
import { AdminMiddleware } from './middleware/admin.middleware';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "KEY",
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, UsersController, PostController, FilesController, VideoController,AuthController],
  providers: [AppService, UsersService, PrismaService, PostService, FilesService, VideoService,AuthService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"/api/post/setlike", method:RequestMethod.ALL},
      {path:"/api/post/setcoment", method:RequestMethod.ALL},
      {path:"/api/post/deletecoment", method:RequestMethod.ALL},
      {path:"/api/post/createpost", method:RequestMethod.ALL},
      {path:"/api/post/editpost", method:RequestMethod.ALL},
      {path:"/api/post/deletepost", method:RequestMethod.ALL},
      {path:"/api/users/profile", method:RequestMethod.ALL},
      {path:"/api/users/banuser", method:RequestMethod.ALL},
      {path:"/api/users/unbanuser", method:RequestMethod.ALL},
      {path:"/api/users/getMyBansUser", method:RequestMethod.ALL},
    )
  }
}

