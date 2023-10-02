import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { generateUniqueLogin } from 'src/service/generateUniqueLogin';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

   //Login
   async login(login: string, password: string) {
    //Ищем текущий логин
    let user = await this.prisma.user.findUnique({
      where: {
        login: login,
      },
    });
    //Если логин есть
    if (user) {
      //Сверяем пароль
      let hash = await bcrypt.compare(password, user.password);
      //Если пароли не совпадают
      if (!hash) {
        return {message:"Пароль не правильный", jwtToken: ""}
      } else {
        //Создаем обьект и заносим данные
        let userData = {
          id: user.id,
          login: user.login,
          role: user.role,
          premium: user.premium,
        };
        //Создаем токен и отдаем токен юзеру
        let newUser = await this.jwtService.sign(userData);
        return { message: 'Вы вошли', jwtToken: newUser };
      }
    } else {
      //Если логин не найден
      return {message:"Логин не найден"}
    }
  }

  //Register
  async register(login: string, password: string,repeatpass:string) {
    //Валидация
    if(login.length <=3  || login.length > 10){
      return {message:"Логин должен быть больше 3 и меньше 11 симоволов"}
    }
    if(password.length <=5  || password.length > 16){
      return {message:"Пароль должен быть больше 5 и меньше 16 симоволов "}
    }
    if(password != repeatpass){
      return {message:"Пароли не совпадают"}
    }
    //Находим юзера с тек логином
    const user = await this.prisma.user.findUnique({
      where: {
        login: login,
      },
    });
    //Если логин уже существует
    if (user) {
      return { message: 'Логин уже существует' };
    } else {
      //Иначе
      //Хешируем пароль
      let hashPassword = await bcrypt.hash(password, 4);
      //Создаем нового юзера
      const newUser = await this.prisma.user.create({
        data: {
          login: login,
          password: hashPassword,
          uniqLogin: new generateUniqueLogin().generate(),
        },
      });
      //Отдает обьект
      return { message: 'Вы создали аккаунт', obj: newUser };
    }
  }
}