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

  @Post('/login')
  async login(@Body() UserDTO: UserDTO): Promise<userMessage> {
    const { login, password } = UserDTO;
    const result = this.userService.login(login, password);
    return result;
  }

  @Post('/register')
  async register(@Body() UserDTO: UserDTO): Promise<userMessage> {
    let { login, password, repeatPass } = UserDTO;
    const result = this.userService.register(login, password);
    return result;
  }
  //Получение на кого я подписан
  @Post('/mysubs')
  async mysub(@Body() UserSubDTO:UserSubDTO): Promise<userMessage>  {
    let {userId} =UserSubDTO
    let result = this.userService.mysubs(userId);
    return result;
  }

  //Получение кто на меня подписан
  @Post('/mysubscribe')
  async mysubcribe(@Body() UserSubDTO:UserSubDTO): Promise<userMessage>  {
    let { subId } = UserSubDTO
    let result = this.userService.mysubcribe(subId);
    return result;
  }

  @Post('/profile')
  async profile(@Body() UserDTO, @Headers('x-api-key') apikey:string): Promise<userMessage>  {
    if (apikey != "KEY") {
        throw new HttpException("Доступ запрещен", 403)
    } else {
      let { id } = UserDTO
      let result = this.userService.profile(Number(id));
      return result;
    }
  }

  @Get('/profile/:id')
  async neMoyProfile(@Param() param): Promise<userMessage>  {
    let { id } = param;
    let result = this.userService.profilehyjoi(Number(id));
    return result;
  }
}

