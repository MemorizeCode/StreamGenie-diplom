import {
  Body,
  Controller,
  Get,
  Headers,
  HttpException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { userMessage } from 'src/interface/user.interface';
import { UserDTO } from '../dto/user.dto';
import { UserSubDTO } from 'src/dto/userSubs.dto';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //Получение на кого я подписан
  @Post('/mysubs')
  async mysub(@Body() UserSubDTO: UserSubDTO): Promise<userMessage> {
    let { userId } = UserSubDTO;
    let result = this.userService.mysubs(userId);
    return result;
  }

  //Получение кто на меня подписан
  @Post('/mysubscribe')
  async mysubcribe(@Body() UserSubDTO: UserSubDTO): Promise<any> {
    let { subId } = UserSubDTO;
    let result = this.userService.mysubcribe(subId);
    return result;
  }

  @Post("/banuser")
  async banuser(@Body() UserSubDTO:UserSubDTO,@Req() req):Promise<any>{
    let {userId} = UserSubDTO;
    let myId = req.user
    let result = this.userService.banuser(userId,Number(myId.id))
    return result
  }

  @Post("/unbanuser")
  async unbanuser(@Body() UserSubDTO:UserSubDTO, @Req() req):Promise<any>{
    let {userId} = UserSubDTO;
    let myId = req.user
    let result = this.userService.unbanuser(userId,Number(myId.id))
    return result
  }

  @Post("/getMyBansUser")
  async getMyBan(@Req() req):Promise<any>{
    let userId = req.user
    let result = this.userService.listban(userId.id)
    return result
  }

  

  @Post('/profile')
  async profile(@Req() req): Promise<any> {
    let userId = req.user;
    let result = this.userService.profile(Number(userId.id));
    return result;
  }

  @Get('/profile/:id')
  async neMoyProfile(@Param() param): Promise<userMessage> {
    let { id } = param;
    let result = this.userService.profilehyjoi(Number(id));
    return result;
  }
}
