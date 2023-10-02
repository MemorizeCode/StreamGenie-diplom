import { MiddlewareConsumer, Module, NestModule, RequestMethod, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';


@Module({
  imports: [AuthModule, PostModule, UsersModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"/api/users/profile", method:RequestMethod.ALL},
      {path:"/api/post/setlike", method:RequestMethod.ALL},
      {path:"/api/post/setcoment", method:RequestMethod.ALL},
      {path:"/api/post/deletecoment", method:RequestMethod.ALL},
      {path:"/api/post/createpost", method:RequestMethod.ALL},
      {path:"/api/post/editpost", method:RequestMethod.ALL},
      {path:"/api/post/deletepost", method:RequestMethod.ALL},
      {path:"/api/messages/sendmessages", method:RequestMethod.ALL},
      {path:"/api/messages/deletemessages", method:RequestMethod.ALL},
      {path:"/api/messages/getmessages/:roomId", method:RequestMethod.ALL},
    )
  }
}
