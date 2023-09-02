import { HttpCode, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  //Получение на кого я подписан
  async mysubs(id: number){
    //Выбираем юзеров, на которых я подписан
    let subs = await this.prisma.user.findMany({
      where:{
        mypodpiski:{
          some:{
            userId:id
          }
        }
      },
      select:{
        channelName:true,
        isOnline:true
      }
    })
    //Если массив подписок пустой
    if(!subs.length){
      return {message:"Пользователи не найдены"}
    }
    //Иначе выводим подписки в массиве
    else{
      return subs
    }
  }
  //Получение кто на меня подписан
  async mysubcribe(id: number) {
    //Выбираем юзеров,  которые  подписаны на меня
    let podpishki = await this.prisma.user.findMany({
      where:{
        myfolowers:{
          some:{
            subId:id
          }
        }
      }
    })
    //Иначе выводим подписчиков в массиве
    if(!podpishki.length){
      return {message:"Пользователи не найдены"}
    }
    //Иначе выводим подписчиков в массиве
    else{
      return podpishki
    }
  }

  //My profile
  async profile(id:number) {
    //Находим профиль с определенным id
    let result = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        login: true,
        premium: true,
        countPost: true,
        countVideo: true,
        countWatch: true,
        isOnline: true,
        uniqLogin: true,
      },
    });

    //Если ответ пуст (ЧТО БЫТЬ НЕ МОЖЕТ, ВОЗМОЖНО, но на всякий случай берем)
    if(result){
      return result
    }
    //Выводим
    else{
      return {message:"Такого id нет"}
    }
  }

  async neMoyProfile(id:number){
    //Ищем пользователя по id
    let result = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        login: true,
        premium: true,
      },
    });

    //Если юзера нет выводим
    if(!result){
      return {message:"Пользователь не найден"}
    }
    //Иначе
    else{
      return result
    }
  }
}
