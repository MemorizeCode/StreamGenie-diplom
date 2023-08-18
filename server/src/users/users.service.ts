import { HttpCode, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { userMessage } from 'src/interface/user.interface';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { generateUniqueLogin } from 'src/service/generateUniqueLogin';
import axios from 'axios';
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  //Login
  async login(login: string, password: string): Promise<userMessage> {
    let user = await this.prisma.user.findUnique({
      where: {
        login: login,
      },
    });
    if (user) {
      let hash = await bcrypt.compare(password, user.password);
      if (!hash) {
        return {message:"Пароль не правильный"}
      } else {
        let userData = {
          id: user.id,
          login: user.login,
          role: user.role,
          premium: user.premium,
        };
        let newUser = await this.jwtService.sign(userData);
        return { message: 'Вы вошли', jwt: newUser };
      }
    } else {
      return {message:"Логин не найден"}
    }
  }

  //Register
  async register(login: string, password: string,repeatpass:string): Promise<userMessage> {
    if(login.length <=3  || login.length > 10){
      return {message:"Логин должен быть больше 3 и меньше 11 симоволов "}
    }
    if(password.length <=5  || password.length > 16){
      return {message:"Пароль должен быть больше 5 и меньше 16 симоволов "}
    }
    if(password != repeatpass){
      return {message:"Пароли не совпадают"}
    }
    const user = await this.prisma.user.findUnique({
      where: {
        login: login,
      },
    });
    if (user) {
      return { message: 'Логин уже существует' };
    } else {
      let hashPassword = await bcrypt.hash(password, 4);
      let ipAdr = '';
      let county = '';
      let city = '';
      let provider = '';
      // let ipcon = await axios
      //   .post('https://ipapi.co/json/')
      //   .then((response) => {
      //     ipAdr = response.data.ip;
      //     county = response.data.country_name;
      //     city = response.data.city;
      //     provider = response.data.org;
      //     console.log(response.data);
      //   });
      const newUser = await this.prisma.user.create({
        data: {
          login: login,
          password: hashPassword,
          uniqLogin: new generateUniqueLogin().generate(),
          ipAdr: ipAdr,
          country: county,
          city: city,
          browser: provider,
        },
      });
      return { message: 'Вы создали аккаунт', obj: newUser };
    }
  }
  //Получение на кого я подписан
  async mysubs(id: number):Promise<userMessage> {
    const user = await this.prisma.user.findMany({
      where: {
        mypodpiski: {
          some: {
            userId: id,
          },
        },
      },
    });
    return {obj:user}
  }
  //Получение кто на меня подписан
  async mysubcribe(id: number):Promise<userMessage> {
    const user = await this.prisma.user.findMany({
      where: {
        myfolowers: {
          some: {
            subId: id,
          },
        },
      },
    });
    return {obj:user}
  }

  //My profile
  async profile(id):Promise<userMessage> {
    let result = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        login: true,
        premium: true,
        email: true,
        countPost: true,
        countVideo: true,
        countWatch: true,
        isOnline: true,
        uniqLogin: true,
      },
    });
    return {obj:result}
  }

  async profilehyjoi(id):Promise<userMessage> {
    let result = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        login: true,
        premium: true,
      },
    });
    return {obj:result}

  }
}
