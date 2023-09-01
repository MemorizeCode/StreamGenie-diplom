import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from '../dto/user.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/test")
  async test(){
    return "Hello"
  }

  @Post('/login')
  async login(@Body() UserDTO: UserDTO): Promise<any> {
    const { login, password } = UserDTO;
    const result = this.authService.login(login, password);
    return result;
  }

  @Post('/register')
  async register(@Body() UserDTO: UserDTO): Promise<any> {
    let { login, password, repeatPass } = UserDTO;
    const result = this.authService.register(login, password,repeatPass);
    return result;
  }

}
