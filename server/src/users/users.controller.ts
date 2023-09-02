import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  Param,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';

import { UsersService } from './users.service';
import { userSubsDTO } from './dto/userSubs.dto';



 
@Controller('/api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //Получение на кого я подписан
  @Post('/mysubs')
  async mysub(@Body() userSubsDTO:userSubsDTO) {
    let { userId } = userSubsDTO;//Мой id, передается в body
    let result = this.userService.mysubs(Number(userId));
    return result;
  }

  //Получение кто на меня подписан
  @Post('/mysubscribe')
  async mysubcribe(@Body() userSubsDTO: userSubsDTO) {
    let { subId } = userSubsDTO;//Мой id, передается в body
    let result = this.userService.mysubcribe(Number(subId));
    return result;
  }
  
  //middleware
  @Post('/profile')
  async profile(@Req() req) {
    let user = req.user;
    let userId = user.id
    let result = this.userService.profile(userId);
    return result;
  }

  
  @Get('/profile/:id')
  async neMoyProfile(@Param() param){
    let { id } = param;
    let result = this.userService.neMoyProfile(Number(id));
    return result;
  }
}
