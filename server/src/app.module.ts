import { MiddlewareConsumer, Module, NestModule, RequestMethod, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { UsersModule } from './users/users.module';


@Module({
  imports: [AuthModule, PostModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      {path:"/api/users/profile", method:RequestMethod.ALL},
    )
  }
}
