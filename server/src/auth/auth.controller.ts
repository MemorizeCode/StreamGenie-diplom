import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/login.dto';
import { registerDTO } from './dto/register.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/login')
  async login(@Body() loginDTO: loginDTO) {
    const { login,password } = loginDTO;
    const result = this.authService.login(login,password);
    return result
  }

  @Post('/register')
  async register(@Body() registerDTO: registerDTO) {
    let { login, password, repeatPassword } = registerDTO;
    const result = this.authService.register(login, password,repeatPassword);
    return result;
  }

}